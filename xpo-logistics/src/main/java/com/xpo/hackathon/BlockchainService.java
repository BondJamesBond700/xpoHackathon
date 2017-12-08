package com.xpo.hackathon;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

import javax.inject.Inject;

import org.springframework.web.client.RestTemplate;

public class BlockchainService {

	@Inject
	private RestTemplate restTemplate;

	public ResponseVO invokeContractMethod(String type, InvokeFuncDTO invokeFuncDTO) {
		String url = "";

		// String url = "http" + "://" + nodeHost + ":" + node.nodePort + "/" +
		// Constants.ETHEREUM_BASEURL + "/" + target;

		InvokeFuncResponseDTO tx = this.restTemplate.postForObject(url, invokeFuncDTO, InvokeFuncResponseDTO.class);
		return new ResponseVO(tx.transactionHash, tx.output);
	}

	private String readContract(String filePath) throws IOException {
		BufferedReader reader = null;
		try {
			StringBuilder fileData = new StringBuilder();
			reader = new BufferedReader(new FileReader(filePath));

			char[] buf = new char[1024];
			int numRead = 0;
			while ((numRead = reader.read(buf)) != -1) {
				String readData = String.valueOf(buf, 0, numRead);
				fileData.append(readData);
			}
			return fileData.toString();
		} catch (IOException e) {
			return "Failed";
		} finally {
			if (reader != null) {
				reader.close();
			}
		}

	}

}
