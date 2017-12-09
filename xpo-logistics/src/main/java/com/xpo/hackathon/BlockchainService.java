package com.xpo.hackathon;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.springframework.web.client.RestTemplate;

public class BlockchainService {

	private RestTemplate restTemplate = new RestTemplate();

	public ResponseVO invokeContractMethod(String type, InvokeFuncDTO invokeFuncDTO) {
		String url = "";

		// String url = "http" + "://" + nodeHost + ":" + node.nodePort + "/" +
		// Constants.ETHEREUM_BASEURL + "/" + target;

		InvokeFuncResponseDTO tx = this.restTemplate.postForObject(url, invokeFuncDTO, InvokeFuncResponseDTO.class);
		return new ResponseVO(tx.transactionHash, tx.output);
	}

	public ResponseVO login(String username, String password) {
		String value = null;
		try {
			InputStream inputStream = getClass().getClassLoader().getResourceAsStream("config.properties");
			Properties properties = new Properties();
			properties.load(inputStream);
			value = properties.getProperty(username);
			if (value != null && value.equals(password)) {
				return new ResponseVO("Success", username);
			}
		} catch (FileNotFoundException exception) {
		} catch (IOException ex) {
		}
		return new ResponseVO("Failure", username);
	}

	public String readContract(String filePath) throws IOException {
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
