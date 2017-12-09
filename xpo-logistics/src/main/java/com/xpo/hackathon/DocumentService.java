//package com.xpo.hackathon;
//
//import java.io.IOException;
//import java.security.NoSuchAlgorithmException;
//import java.sql.Connection;
//import java.sql.DriverManager;
//import java.sql.SQLException;
//import java.sql.Statement;
//import java.util.List;
//
//import javax.inject.Inject;
//import javax.servlet.ServletOutputStream;
//import javax.servlet.http.HttpServletResponse;
//
//import org.json.simple.JSONArray;
//import org.json.simple.JSONObject;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.infosys.icets.framework.config.Utility;
//import com.infosys.icets.framework.service.BlockchainService;
//import com.infosys.icets.framework.vo.ResponseVO;
//
//@Service
//public class DocumentService {
//
//	private final Logger log = LoggerFactory.getLogger(DocumentService.class);
//	
//	public Connection createConnection() throws SQLException, ClassNotFoundException {
//		Class.forName("com.mysql.jdbc.Driver");  
//		return DriverManager.getConnection("jdbc:mysql://localhost:3306/xpo-logistics","root","root");  
//	}
//
//	public ResponseVO downloadDoc(Integer attachmentId, HttpServletResponse response) {
//		response.setContentType(attachmentDTO.mimeType);
//		response.setHeader("Content-Disposition", "attachment; filename=" + attachmentDTO.fileName);
//		response.setContentLength(attachmentDTO.content.length);
//		try {
//			ServletOutputStream out = response.getOutputStream();
//			out.write(attachmentDTO.content);
//			out.flush();
//			out.close();
//		} catch (IOException e) {
//			log.error(e.toString());
//		}
//		return new ResponseVO("Success", attachmentDTO.id);
//	}
//
//	@SuppressWarnings("unchecked")
//	public ResponseVO uploadDoc(List<MultipartFile> files, String remarks) throws SQLException, ClassNotFoundException, NoSuchAlgorithmException {
//		JSONArray attachments = new JSONArray();
//		log.info("Entry:uploadDoc");
//		for (MultipartFile file : files) {
//			if (file.isEmpty()) {
//				continue; // next pls
//			}
//			try {
//				byte[] content = file.getBytes();
//				String docHash = Utility.calculateHash(content);
//				Statement statement=createConnection().createStatement();;
//				String sql = "INSERT INTO attachment VALUES (100, 'Zara', 'Ali', 18)";
//				statement.executeUpdate(sql);
//
//			} catch (IOException e) {
//				log.error(e.toString());
//			}
//		}
//		return new ResponseVO("Success", attachments);
//	}
//
//	public ResponseVO updateDocInfo(Integer attachmentId, DocUpdateVO docUpdateVO) {
//		AttachmentDTO attachmentDTO = null;
//		attachmentDTO = attachmentDTOService.findOne(attachmentId);
//		attachmentDTO.tx = transactionDTOService.findOne(docUpdateVO.getTransactionId());
//		attachmentDTOService.save(attachmentDTO);
//		return new ResponseVO("Success", "");
//	}
//
//	public Integer saveFile(String filename, byte[] content, String docHash, Integer chainId, String mimeType,
//			String remarks) {
//		AttachmentDTO attachmentDTO = new AttachmentDTO();
//		attachmentDTO.fileName = filename;
//		attachmentDTO.content = content;
//		attachmentDTO.docHash = docHash;
//		attachmentDTO.chainId = chainId;
//		attachmentDTO.mimeType = mimeType;
//		attachmentDTO.remarks = remarks;
//		attachmentDTO.tx = null;
//		return attachmentDTOService.save(attachmentDTO).id;
//	}
//
//	public ResponseVO verifyDocument(Integer chainId, String txNum, Integer attachmentId) {
//		log.info("Entry:getDocHash");
//
//		TransactionDTO transactionDTO = transactionDTOService.findTransactionByTransactionNum(txNum);
//		AccountDTO account = transactionDTO.fromAccount;
//		account = accountDTOService.findOne(account.id);
//		NodeDTO node = nodeDTOService.findOne(account.node.id);
//		AttachmentDTO attachmentDTO = attachmentDTOService.findOne(attachmentId);
//
//		if ( (Constants.Platforms.PLATFORM_ETHEREUM_ID.getPlatformName().toLowerCase().trim()).equals(node.chain.platformName.toLowerCase().trim()) )
//			txNum = transactionDTO.tag1; // For Ethereum reference to Dochash is stored in tag1
//		
//		log.info("tx Numb is %s", txNum);
//
//		JSONObject transactionMeta = getBcPlatformInstance(chainId).getTransaction(chainId, node, txNum);
//		if (transactionMeta != null) {
//			log.info("attachmentMeta: " + transactionMeta.toJSONString());
//			JSONArray attachments = (JSONArray) transactionMeta.get("attachmentMeta");
//			log.info("attachments: " + attachments.toJSONString());
//			for (Object json : attachments) {
//				JSONObject attachmentJSON = (JSONObject) json;
//				log.info("docHash: " + attachmentJSON.get("docHash"));
//				if (attachmentJSON.get("docHash").equals(Utility.calculateHash(attachmentDTO.content))) {
//					return new ResponseVO("Success", "Verified");
//				}
//			}
//		}
//		return new ResponseVO("Failure", "Tampered");
//	}
//
//	public List<AttachmentDTO> getDocList(Integer chainId, String type) {
//		return attachmentDTOService.findAttachmentByChainIdInAndType(chainId, type);
//	}
//}