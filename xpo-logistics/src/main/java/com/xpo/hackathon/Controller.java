package com.xpo.hackathon;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.infosys.icets.dto.AttachmentDTO;
import com.infosys.icets.framework.vo.DocUpdateVO;

@RestController
public class Controller {

	@Inject
	private BlockchainService blockchainService;

	@RequestMapping(value = "/action{tyype}", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseVO> invokeContractMethod(@PathVariable String type,
			@RequestBody InvokeFuncDTO invokeFuncDTO) {
		return Optional.ofNullable(blockchainService.invokeContractMethod(type, invokeFuncDTO))
				.map(result -> new ResponseEntity<>(result, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
	}
	
	@RequestMapping(value = "/docs", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseVO> uploadDoc(@RequestParam("files") MultipartFile[] files, String remarks,
			@RequestParam("chainId") Optional<Integer> chainId) {
		if (chainId.isPresent()) {
			return Optional.ofNullable(bcfService.uploadDoc(Arrays.asList(files), remarks, chainId.get()))
					.map(result -> new ResponseEntity<>(result, HttpStatus.OK))
					.orElse(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
		} else {
			return Optional.ofNullable(bcfService.uploadDoc(Arrays.asList(files), remarks, null))
					.map(result -> new ResponseEntity<>(result, HttpStatus.OK))
					.orElse(new ResponseEntity<>(HttpStatus.BAD_REQUEST));

		}
	}

	@RequestMapping(value = "/docs/{attachmentId}", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseVO> updateDocInfo(@PathVariable Integer attachmentId,
			@Valid @RequestBody DocUpdateVO docUpdateVO) {
		return Optional.ofNullable(bcfService.updateDocInfo(attachmentId, docUpdateVO))
				.map(result -> new ResponseEntity<>(result, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
	}

	@RequestMapping(value = "/docs/{attachmentId}", method = GET)
	public ResponseEntity<ResponseVO> downloadDoc(@PathVariable Integer attachmentId, HttpServletResponse response) {
		return Optional.ofNullable(bcfService.downloadDoc(attachmentId, response))
				.map(result -> new ResponseEntity<>(result, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.UNAUTHORIZED));
	}

	@RequestMapping(value = "/docs/hash/verify/{chainId}/{txNum}/{attachmentId}", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseVO> verifyDocument(@PathVariable Integer chainId, @PathVariable String txNum,
			@PathVariable Integer attachmentId) {

		return Optional.ofNullable(bcfService.verifyDocument(chainId, txNum, attachmentId))
				.map(result -> new ResponseEntity<>(result, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.UNAUTHORIZED));

	}

	@RequestMapping(value = "/docs/{chainId}/{type}/{userId}", method = GET)
	public ResponseEntity<List<AttachmentDTO>> getDocList(@PathVariable Integer chainId, @PathVariable String type,
			@PathVariable Integer userId) {
		return Optional.ofNullable(bcfService.getDocList(chainId, type))
				.map(result -> new ResponseEntity<>(result, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.UNAUTHORIZED));
	}
}

}