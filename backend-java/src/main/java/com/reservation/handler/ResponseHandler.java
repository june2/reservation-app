
package com.reservation.handler;

public class ResponseHandler{	
	private String status ;
	private Object data;
	
	public ResponseHandler() {
		super();
	}

	public ResponseHandler(String status, Object data) {
		super();
		this.status = status;
		this.data = data;
	}
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
}