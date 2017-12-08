package com.xpo.hackathon;

public class InvokeFuncResponseDTO {
	public String transactionHash;
	public Object[] output;

	public InvokeFuncResponseDTO() {
	}

	public InvokeFuncResponseDTO(String transactionHash, Object[] output) {
		this.transactionHash = transactionHash;
		this.output = output;
	}
}
