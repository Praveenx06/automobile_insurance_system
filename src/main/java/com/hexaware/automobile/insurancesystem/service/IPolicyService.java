package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen   
 * Modified on : 02-Aug-2025
 * Description :IPolicyService 
 * */
import java.util.List;

import com.hexaware.automobile.insurancesystem.entities.Policy;


public interface IPolicyService {
	
		public Policy addPolicy(Policy policy);

	    public Policy getPolicyById(int policyId);

	    public List<Policy> getAllPolicies();

	    public Policy updatePolicy(Policy policy) ;
	    public String deletePolicyById(int policyId);
	

}
