package com.hexaware.automobile.insurancesystem.restcontroller;

import java.util.List;  

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.automobile.insurancesystem.dto.PolicyDto;

import com.hexaware.automobile.insurancesystem.service.IPolicyService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

/* Author : Praveen   
 * Modified on : 2-Aug-2025
 * Description : Document restcontroller with endpoints
 * */
@CrossOrigin(origins ="http://localhost:5173/")
@RestController
@Slf4j
@RequestMapping("/api/policies")
public class PolicyRestController {
	@Autowired
	IPolicyService service;
	
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/add")
    public PolicyDto addPolicy(@Valid @RequestBody PolicyDto policy) {
        log.debug("Adding new policy: {}", policy);
        return service.addPolicy(policy);
    }
	 
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PutMapping("/update")
    public PolicyDto updatePolicy(@Valid @RequestBody PolicyDto policy)  {
        log.info("Updating policy with ID: ", policy.getPolicyId());
        return service.updatePolicy(policy);
    }

	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/getById/{policyId}")
    public PolicyDto getPolicyById(@PathVariable int policyId) {
        log.info("Retrieving policy with ID: ", policyId);
        return service.getPolicyById(policyId);
    }

	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/getAll")
    public List<PolicyDto> getAllPolicies() {
        log.debug("Retrieving all policies");
        return service.getAllPolicies();
    }
    
	@PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/deleteById/{policyId}")
    public String deletePolicyById(@PathVariable int policyId) {
        log.info("Deleting policy with ID: ", policyId);
        return service.deletePolicyById(policyId);
    }
   

}
