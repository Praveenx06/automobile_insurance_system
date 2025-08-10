package com.hexaware.automobile.insurancesystem.service;

import java.util.List;

import com.hexaware.automobile.insurancesystem.entities.Policy;
import com.hexaware.automobile.insurancesystem.exception.PolicyNotFoundException;

public interface IPolicyService {
	
		public Policy addPolicy(Policy policy);

	    public Policy getPolicyById(int policyId) throws PolicyNotFoundException;

	    public List<Policy> getAllPolicies();

	    public Policy updatePolicy(Policy policy) throws PolicyNotFoundException;

	    public String deletePolicyById(int policyId);
	

}
