package com.hexaware.automobile.insurancesystem.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.automobile.insurancesystem.entities.Policy;
import com.hexaware.automobile.insurancesystem.service.IPolicyService;

import lombok.extern.slf4j.Slf4j;

/* Author : Praveen   
 * Modified on : 2-Aug-2025
 * Description : Document restcontroller with endpoints
 * */
@RestController
@Slf4j
@RequestMapping("/api/policies")
public class PolicyRestController {
	@Autowired
	IPolicyService service;
	

    @PostMapping("/add")
    public Policy addPolicy(@RequestBody Policy policy) {
        log.debug("Adding new policy: {}", policy);
        return service.addPolicy(policy);
    }

    @PostMapping("/update")
    public Policy updatePolicy(@RequestBody Policy policy)  {
        log.info("Updating policy with ID: ", policy.getPolicyId());
        return service.updatePolicy(policy);
    }

    @GetMapping("/getById/{policyId}")
    public Policy getPolicyById(@PathVariable int policyId) {
        log.info("Retrieving policy with ID: ", policyId);
        return service.getPolicyById(policyId);
    }

    @GetMapping("/getAll")
    public List<Policy> getAllPolicies() {
        log.debug("Retrieving all policies");
        return service.getAllPolicies();
    }

    @DeleteMapping("/deleteById/{policyId}")
    public String deletePolicyById(@PathVariable int policyId) {
        log.info("Deleting policy with ID: ", policyId);
        return service.deletePolicyById(policyId);
    }
	

}
