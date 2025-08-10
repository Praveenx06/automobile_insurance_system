package com.hexaware.automobile.insurancesystem.service;

import java.util.List;

import com.hexaware.automobile.insurancesystem.entities.Claim;
import com.hexaware.automobile.insurancesystem.exception.ClaimNotFoundException;

public interface IClaimService {
	
	public Claim addClaim(Claim claim);

    public Claim getClaimById(int claimId) throws ClaimNotFoundException;

    public List<Claim> getAllClaims();

    public Claim updateClaim(Claim claim) throws ClaimNotFoundException;

    public String deleteClaimById(int claimId) ;


}
