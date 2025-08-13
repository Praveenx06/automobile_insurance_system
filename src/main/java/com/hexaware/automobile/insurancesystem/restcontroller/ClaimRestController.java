package com.hexaware.automobile.insurancesystem.restcontroller;
import java.time.LocalDate;
/* Author : Praveen   
 * Modified on : 1-Aug-2025
 * Description : Claim restcontroller with endpoints
 * */
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.automobile.insurancesystem.dto.ClaimDto;
import com.hexaware.automobile.insurancesystem.entities.Claim;
import com.hexaware.automobile.insurancesystem.service.IClaimService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api/claims")
public class ClaimRestController {
	@Autowired
	IClaimService service;
	
	 @PreAuthorize("hasAuthority('ADMIN','USER')")
	  @PostMapping("/add")
	    public Claim addClaim(@Valid @RequestBody ClaimDto dto) {
	        log.debug("Adding new claim: {}", dto);
	        return service.addClaim(dto);
	    }
	  
	  @PreAuthorize("hasAuthority('ADMIN')")
	  @PutMapping("/update")
	    public Claim updateClaim(@Valid @RequestBody Claim claim)  {
	        log.info("Updating claim with ID: {} ", claim.getClaimId());
	        return service.updateClaim(claim);
	    }
	  
	  @PreAuthorize("hasAuthority('ADMIN','USER')")
	  @GetMapping("/getById/{claimId}")
	    public Claim getClaimById(@PathVariable int claimId)  {
	        log.info("Retrieving claim with ID: {} ", claimId);
	        return service.getClaimById(claimId);
	    }
	  
	  @PreAuthorize("hasAuthority('ADMIN','USER')")
	    @GetMapping("/getAll")
	    public List<Claim> getAllClaims() {
	        log.debug("Retrieving all claims: {}");
	        return service.getAllClaims();
	    }
	    
	    @DeleteMapping("/deleteById/{claimId}")
	    	public String deleteClaimById (@PathVariable int claimId) {
	    	log.info("Deleting claim by Id: {}",claimId);
	    	return service.deleteClaimById(claimId);
	    	
	    		
	    	}
	    
	    @GetMapping("/dateRange")
	    public List<Claim> getClaimsBetweenDates(@RequestParam LocalDate startDate, @RequestParam LocalDate endDate) {
	        log.info("Retrieving claims between {} and {}", startDate, endDate);
	        return service.getClaimsBetweenDates(startDate, endDate);
	    }
	

}
