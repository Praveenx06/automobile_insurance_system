package com.hexaware.automobile.insurancesystem.dto;



public class AuthResponse {
    private String token;
    private String message;

    public AuthResponse(String token) {
        this.token = token;
        this.message = "Success";
    }

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
    
    
    
}




