package com.hexaware.automobile.insurancesystem.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
	 @ExceptionHandler(AddonNotFoundException.class)
	    public ResponseEntity<String> handleAddonNotFound(AddonNotFoundException ex) {
	        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
	    }
	 @ExceptionHandler(UserNotFoundException.class)
	 public ResponseEntity<String> handleUserNotFound(UserNotFoundException ex) {
	     return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
	 }

}
