package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen   
 * Modified on : 01-Aug-2025
 * Description :IClaimService 
 * */
import java.time.LocalDate;
import java.util.List;

import com.hexaware.automobile.insurancesystem.dto.ClaimDto;
import com.hexaware.automobile.insurancesystem.entities.Claim;


public interface IClaimService {
	
	public ClaimDto addClaim(ClaimDto dto);

    public ClaimDto getClaimById(int claimId);

    public List<ClaimDto> getAllClaims();

    public ClaimDto updateClaim(ClaimDto claim) ;
    public String deleteClaimById(int claimId) ;

    public List<Claim> getClaimsBetweenDates(LocalDate startDate, LocalDate endDate);
}
