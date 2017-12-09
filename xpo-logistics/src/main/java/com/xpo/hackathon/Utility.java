package com.xpo.hackathon;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Utility {

	public static String calculateHash(byte[] content) throws NoSuchAlgorithmException {

		String data = content.toString();
		MessageDigest md5 = MessageDigest.getInstance("MD5");
		md5.update(StandardCharsets.UTF_8.encode(data));
		return String.format("%032x", new BigInteger(1, md5.digest()));
	}
}
