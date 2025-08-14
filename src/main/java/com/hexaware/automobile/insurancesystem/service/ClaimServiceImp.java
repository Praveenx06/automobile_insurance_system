package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen    
 * Modified on : 02-Aug-2025
 * Description :  ClaimServiceImp
 * */
import java.time.LocalDate;
/* Author : Praveen   
 * Modified on : 1-Aug-2025
 * Description : Claim service implementation calss with autowired documentrepository
 * */
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.automobile.insurancesystem.dto.ClaimDto;
import com.hexaware.automobile.insurancesystem.entities.Claim;
import com.hexaware.automobile.insurancesystem.entities.Policy;
import com.hexaware.automobile.insurancesystem.exception.ClaimNotFoundException;
import com.hexaware.automobile.insurancesystem.repository.ClaimRepository;
import com.hexaware.automobile.insurancesystem.repository.PolicyRepository;
@Service
public class ClaimServiceImp implements IClaimService{
	@Autowired
	ClaimRepository repo;

	 @Autowired
	    PolicyRepository repo1;
	@Override
	public Claim addClaim(ClaimDto dto) {
		Policy policy = repo1.findById(dto.getPolicyId())
                .orElseThrow(() -> new ClaimNotFoundException("Policy with ID " + dto.getPolicyId() + " not found"));

        Claim claim = new Claim();
        claim.setClaimId(dto.getClaimId());
        claim.setClaimDate(dto.getClaimDate());
        claim.setClaimReason(dto.getClaimReason());
        claim.setStatus(dto.getStatus());
        claim.setPolicy(policy);

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
	
	@Override
    public List<Claim> getClaimsBetweenDates(LocalDate startDate, LocalDate endDate) {
        return repo.findClaimsBetweenDates(startDate, endDate);
    }

}
