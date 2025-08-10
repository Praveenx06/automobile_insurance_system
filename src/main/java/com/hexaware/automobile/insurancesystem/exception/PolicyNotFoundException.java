package com.hexaware.automobile.insurancesystem.exception;

public class PolicyNotFoundException extends RuntimeException{
	
	public PolicyNotFoundException (String message) {
		super(message);
	}

}
