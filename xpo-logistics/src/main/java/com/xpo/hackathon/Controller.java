package com.xpo.hackathon;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.util.Optional;

import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

	BlockchainService blockchainService = new BlockchainService();

	@RequestMapping(value = "/action/{type}", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseVO> invokeContractMethod(@PathVariable String type,
			@RequestBody InvokeFuncDTO invokeFuncDTO) {
		return Optional.ofNullable(blockchainService.invokeContractMethod(type, invokeFuncDTO))
				.map(result -> new ResponseEntity<>(result, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
	}

	@RequestMapping(value = "/login", method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseVO> login(@RequestBody JSONObject credentials) {
		return Optional
				.ofNullable(blockchainService.login(credentials.get("username").toString(),
						credentials.get("password").toString()))
				.map(result -> new ResponseEntity<>(result, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
	}
}