package com.xpo.hackathon;

import java.io.IOException;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.infosys.icets.dto.AccountDTO;
import com.infosys.icets.dto.AccountDTOService;
import com.infosys.icets.dto.AttachmentDTO;
import com.infosys.icets.dto.AttachmentDTOService;
import com.infosys.icets.dto.ChainDTO;
import com.infosys.icets.dto.ChainDTOService;
import com.infosys.icets.dto.NodeDTO;
import com.infosys.icets.dto.NodeDTOService;
import com.infosys.icets.dto.TransactionDTO;
import com.infosys.icets.dto.TransactionDTOService;
import com.infosys.icets.framework.config.Constants;
import com.infosys.icets.framework.config.Utility;
import com.infosys.icets.framework.service.BlockchainService;
import com.infosys.icets.framework.vo.DocUpdateVO;
import com.infosys.icets.framework.vo.ResponseVO;

@Service
public class BcfDocumentServiceImpl {

	@Autowired
	@Qualifier("multichain")
	protected BlockchainService multichainService;

	@Autowired
	@Qualifier("ethereum")
	protected BlockchainService ethereumService;

	@Autowired
	@Qualifier("hyperledger")
	protected BlockchainService hyperledgerService;

	@Qualifier("hyperledger1.0")
	protected BlockchainService hyperledgerOneService;

	@Inject
	private AttachmentDTOService attachmentDTOService;

	@Inject
	private TransactionDTOService transactionDTOService;

	@Inject
	private NodeDTOService nodeDTOService;

	@Inject
	private ChainDTOService chainDTOService;

	@Inject
	private AccountDTOService accountDTOService;

	private final Logger log = LoggerFactory.getLogger(BcfDocumentServiceImpl.class);

	public BlockchainService getBcPlatformInstance(Integer chainId) {

		ChainDTO chainDTO = chainDTOService.findOne(chainId);
		if (Constants.PLATFORM_HYPERLEDGER_ONE.equalsIgnoreCase(chainDTO.platformName)) {
			return hyperledgerService;
		} else if (Constants.PLATFORM_MULTICHAIN.equalsIgnoreCase(chainDTO.platformName)) {
			return multichainService;
		} else if (Constants.PLATFORM_HYPERLEDGER_POINTSIX.equalsIgnoreCase(chainDTO.platformName)) {
			return hyperledgerService;
		} else if (Constants.PLATFORM_ETHEREUM.equalsIgnoreCase(chainDTO.platformName)) {
			return ethereumService;
		}

		return null;
	}

	public ResponseVO downloadDoc(Integer attachmentId, HttpServletResponse response) {
		AttachmentDTO attachmentDTO = attachmentDTOService.findOne(attachmentId);
		response.setContentType(attachmentDTO.mimeType);
		response.setHeader("Content-Disposition", "attachment; filename=" + attachmentDTO.fileName);
		response.setContentLength(attachmentDTO.content.length);
		try {
			ServletOutputStream out = response.getOutputStream();
			out.write(attachmentDTO.content);
			out.flush();
			out.close();
		} catch (IOException e) {
			log.error(e.toString());
		}
		return new ResponseVO("Success", attachmentDTO.id);
	}

	@SuppressWarnings("unchecked")
	public ResponseVO uploadDoc(List<MultipartFile> files, String remarks, Integer chainId) {
		JSONArray attachments = new JSONArray();
		log.info("Entry:uploadDoc");
		for (MultipartFile file : files) {
			if (file.isEmpty()) {
				continue; // next pls
			}
			try {
				byte[] content = file.getBytes();
				String docHash = Utility.calculateHash(content);
				JSONObject attachmentJSON = new JSONObject();
				attachmentJSON.put("documentName", file.getOriginalFilename());
				attachmentJSON.put("docHash", docHash);
				attachmentJSON.put("attchmentId", saveFile(file.getOriginalFilename(), content, docHash, chainId,
						file.getContentType(), remarks));
				attachments.add(attachmentJSON);

			} catch (IOException e) {
				log.error(e.toString());
			}
		}
		return new ResponseVO("Success", attachments);
	}

	public ResponseVO updateDocInfo(Integer attachmentId, DocUpdateVO docUpdateVO) {
		AttachmentDTO attachmentDTO = null;
		attachmentDTO = attachmentDTOService.findOne(attachmentId);
		attachmentDTO.tx = transactionDTOService.findOne(docUpdateVO.getTransactionId());
		attachmentDTOService.save(attachmentDTO);
		return new ResponseVO("Success", "");
	}

	public Integer saveFile(String filename, byte[] content, String docHash, Integer chainId, String mimeType,
			String remarks) {
		AttachmentDTO attachmentDTO = new AttachmentDTO();
		attachmentDTO.fileName = filename;
		attachmentDTO.content = content;
		attachmentDTO.docHash = docHash;
		attachmentDTO.chainId = chainId;
		attachmentDTO.mimeType = mimeType;
		attachmentDTO.remarks = remarks;
		attachmentDTO.tx = null;
		return attachmentDTOService.save(attachmentDTO).id;
	}

	public ResponseVO verifyDocument(Integer chainId, String txNum, Integer attachmentId) {
		log.info("Entry:getDocHash");

		TransactionDTO transactionDTO = transactionDTOService.findTransactionByTransactionNum(txNum);
		AccountDTO account = transactionDTO.fromAccount;
		account = accountDTOService.findOne(account.id);
		NodeDTO node = nodeDTOService.findOne(account.node.id);
		AttachmentDTO attachmentDTO = attachmentDTOService.findOne(attachmentId);

		if ( (Constants.Platforms.PLATFORM_ETHEREUM_ID.getPlatformName().toLowerCase().trim()).equals(node.chain.platformName.toLowerCase().trim()) )
			txNum = transactionDTO.tag1; // For Ethereum reference to Dochash is stored in tag1
		
		log.info("tx Numb is %s", txNum);

		JSONObject transactionMeta = getBcPlatformInstance(chainId).getTransaction(chainId, node, txNum);
		if (transactionMeta != null) {
			log.info("attachmentMeta: " + transactionMeta.toJSONString());
			JSONArray attachments = (JSONArray) transactionMeta.get("attachmentMeta");
			log.info("attachments: " + attachments.toJSONString());
			for (Object json : attachments) {
				JSONObject attachmentJSON = (JSONObject) json;
				log.info("docHash: " + attachmentJSON.get("docHash"));
				if (attachmentJSON.get("docHash").equals(Utility.calculateHash(attachmentDTO.content))) {
					return new ResponseVO("Success", "Verified");
				}
			}
		}
		return new ResponseVO("Failure", "Tampered");
	}

	public List<AttachmentDTO> getDocList(Integer chainId, String type) {
		return attachmentDTOService.findAttachmentByChainIdInAndType(chainId, type);
	}
}