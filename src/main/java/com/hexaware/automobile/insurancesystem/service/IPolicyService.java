package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen   
 * Modified on : 02-Aug-2025
 * Description :IPolicyService 
 * */
import java.util.List;

import com.hexaware.automobile.insurancesystem.dto.PolicyDto;


public interface IPolicyService {
	
		public PolicyDto addPolicy(PolicyDto policy);

	    public PolicyDto getPolicyById(int policyId);

	    public List<PolicyDto> getAllPolicies();

	    public PolicyDto updatePolicy(PolicyDto policy) ;
	    public String deletePolicyById(int policyId);
	

}
