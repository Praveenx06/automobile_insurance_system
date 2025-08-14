package com.hexaware.automobile.insurancesystem.exception;
/*
 * Author : Praveen  
 * Modified on : 9-Aug-2025 
 * Description : Overall GlobalException handler 
 * 
 */
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
	 
	 @ExceptionHandler(ClaimNotFoundException.class)
	 public ResponseEntity<String> handleClaimNotFound(ClaimNotFoundException ex) {
	     return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
	 }
	 
	 @ExceptionHandler(DocumentNotFoundException.class)
	 public ResponseEntity<String> handleDocumentNotFound(DocumentNotFoundException ex) {
	     return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
	 }
	 
	 @ExceptionHandler(PolicyNotFoundException.class)
	 public ResponseEntity<String> handlePolicyNotFound(PolicyNotFoundException ex) {
	     return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
	 }
	  
	 @ExceptionHandler(ProposalNotFoundException.class)
	 public ResponseEntity<String> handleProposalNotFound(ProposalNotFoundException ex) {
	     return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
	 }
	 
	 @ExceptionHandler(QuoteNotFoundException.class)
	 public ResponseEntity<String> handleQuoteNotFound(QuoteNotFoundException ex) {
	     return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
	 }
	 @ExceptionHandler(ResourceNotFoundException.class)
	 public ResponseEntity<String> handleResourceNotFound(ResourceNotFoundException ex) {
	     return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
	 }
	 
	 @ExceptionHandler(VehicleNotFoundException.class)
	 public ResponseEntity<String> handleVehicleNotFound(VehicleNotFoundException ex) {
	     return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
	 }
	 @ExceptionHandler(AddonAlreadyExistsException.class)
	 public ResponseEntity<String> handleAddonAlreadyExists(AddonAlreadyExistsException ex) {
	     return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
	 }
	 @ExceptionHandler(UsernameNotFoundException.class)
	 public ResponseEntity<String> handleUsernameNotFound(UsernameNotFoundException ex) {
	     return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
	 }
	 
}
