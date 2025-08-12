package com.hexaware.automobile.insurancesystem.service;

import java.time.LocalDate;
import java.util.List;

import com.hexaware.automobile.insurancesystem.dto.ClaimDto;
import com.hexaware.automobile.insurancesystem.entities.Claim;


public interface IClaimService {
	
	public Claim addClaim(ClaimDto dto);

    public Claim getClaimById(int claimId);

    public List<Claim> getAllClaims();

    public Claim updateClaim(Claim claim) ;
    public String deleteClaimById(int claimId) ;

    public List<Claim> getClaimsBetweenDates(LocalDate startDate, LocalDate endDate);
}
