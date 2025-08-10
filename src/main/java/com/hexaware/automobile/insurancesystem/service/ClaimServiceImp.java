package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen   
 * Modified on : 1-Aug-2025
 * Description : Claim service implementation calss with autowired documentrepository
 * */
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.automobile.insurancesystem.entities.Claim;
import com.hexaware.automobile.insurancesystem.exception.ClaimNotFoundException;
import com.hexaware.automobile.insurancesystem.repository.ClaimRepository;
@Service
public class ClaimServiceImp implements IClaimService{
	@Autowired
	ClaimRepository repo;

	@Override
	public Claim addClaim(Claim claim) {
		
		return repo.save(claim);
	}

	@Override
	public Claim getClaimById(int claimId) throws ClaimNotFoundException {
		
		return repo.findById(claimId).orElseThrow(() ->  new ClaimNotFoundException("ClaimId " + claimId + " not found"));
	}

	@Override
	public List<Claim> getAllClaims() {
		
		return repo.findAll();
	}

	@Override
	public Claim updateClaim(Claim claim) throws ClaimNotFoundException {
		if(!repo.existsById(claim.getClaimId())) {
			throw new ClaimNotFoundException("Cannot update " +claim.getClaimId() +"not found");
		}
		return repo.save(claim);
	}

	@Override
	public String deleteClaimById(int claimId) {
	repo.deleteById(claimId);
		return "Record deleted successfully";
	}

}
