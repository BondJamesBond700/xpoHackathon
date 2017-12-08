/**
 * 
 */
package com.xpo.hackathon;

public class ResponseVO {
	private String status;
	private Object response;

	public ResponseVO(String status, Object response) {
		super();
		this.status = status;
		this.response = response;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Object getResponse() {
		return response;
	}

	public void setResponse(Object response) {
		this.response = response;
	}

}
