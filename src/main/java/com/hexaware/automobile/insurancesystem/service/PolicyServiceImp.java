package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen    
 * Modified on : 02-Aug-2025
 * Description : Policy service implementation calss 
 * */
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.automobile.insurancesystem.entities.Policy;
import com.hexaware.automobile.insurancesystem.exception.PolicyNotFoundException;
import com.hexaware.automobile.insurancesystem.repository.PolicyRepository;

@Service
public class PolicyServiceImp implements IPolicyService {

	@Autowired
	PolicyRepository repo;
	
	@Override
	public Policy addPolicy(Policy policy) {
		
		return repo.save(policy);
	}

	@Override
	public Policy getPolicyById(int policyId) throws PolicyNotFoundException {
		
		return repo.findById(policyId).orElseThrow(() -> new PolicyNotFoundException ("Policy id " +policyId+ " not found"));
	}

	@Override
	public List<Policy> getAllPolicies() {
		
		return repo.findAll();
	}

	@Override
	public Policy updatePolicy(Policy policy) throws PolicyNotFoundException {
		if (!repo.existsById(policy.getPolicyId())) {
            throw new PolicyNotFoundException("Cannot update policy");     
		}
		return repo.save(policy);
	}

	@Override
	public String deletePolicyById(int policyId) {
		repo.deleteById(policyId);
		return "Record deleted successfully";
	}

}
