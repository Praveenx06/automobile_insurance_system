package com.hexaware.automobile.insurancesystem.restcontroller;
/* Author : Praveen   
 * Modified on : 1-Aug-2025
 * Description : Claim restcontroller with endpoints
 * */
import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.automobile.insurancesystem.entities.Claim;
import com.hexaware.automobile.insurancesystem.service.IClaimService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api/claims")
public class ClaimRestController {
	@Autowired
	IClaimService service;
	
	  @PostMapping("/add")
	    public Claim addClaim(@RequestBody Claim claim) {
	        log.debug("Adding new claim ", claim);
	        return service.addClaim(claim);
	    }
	  
	  @PostMapping("/update")
	    public Claim updateClaim(@RequestBody Claim claim)  {
	        log.info("Updating claim with ID ", claim.getClaimId());
	        return service.updateClaim(claim);
	    }
	  
	  @GetMapping("/getById/{claimId}")
	    public Claim getClaimById(@PathVariable int claimId)  {
	        log.info("Retrieving claim with ID ", claimId);
	        return service.getClaimById(claimId);
	    }
	  

	    @GetMapping("/getAll")
	    public List<Claim> getAllClaims() {
	        log.debug("Retrieving all claims");
	        return service.getAllClaims();
	    }
	    
	    @DeleteMapping("/deleteById/{claimId}")
	    	public String deleteClaimById (@PathVariable int claimId) {
	    	return service.deleteClaimById(claimId);
	    	
	    		
	    	}
	    
	

}
