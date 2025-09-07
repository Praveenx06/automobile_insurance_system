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
	 
	  public ClaimDto mapToDto(Claim claim) {
	        ClaimDto dto = new ClaimDto();
	        dto.setClaimId(claim.getClaimId());
	        dto.setClaimDate(claim.getClaimDate());
	        dto.setClaimReason(claim.getClaimReason());
	        dto.setStatus(claim.getStatus());
	        dto.setPolicyId(claim.getPolicy().getPolicyId());
	        return dto;
	    }
	 

	  @Override
	  public ClaimDto addClaim(ClaimDto dto) {
	      Policy policy = repo1.findById(dto.getPolicyId())
	              .orElseThrow(() -> new ClaimNotFoundException("Policy with ID " + dto.getPolicyId() + " not found"));

	      Claim claim = new Claim();
	      claim.setClaimId(dto.getClaimId());
	      claim.setClaimDate(dto.getClaimDate());
	      claim.setClaimReason(dto.getClaimReason());
	      claim.setStatus(dto.getStatus());
	      claim.setPolicy(policy);

	      Claim savedClaim = repo.save(claim);

	      // convert entity back to DTO
	      return mapToDto(savedClaim);
	  }

	@Override
	public ClaimDto getClaimById(int claimId) {
	    Claim claim = repo.findById(claimId)
	            .orElseThrow(() -> new ClaimNotFoundException("ClaimId " + claimId + " not found"));
	    return mapToDto(claim);
	}

	@Override
	public List<ClaimDto> getAllClaims() {
	    return repo.findAll()
	               .stream()
	               .map(this::mapToDto)
	               .toList();
	}

	@Override
	public ClaimDto updateClaim(ClaimDto dto) {
	    Claim claim = repo.findById(dto.getClaimId())
	                      .orElseThrow(() -> new ClaimNotFoundException("Claim not found"));

	    claim.setClaimDate(dto.getClaimDate());
	    claim.setClaimReason(dto.getClaimReason());
	    claim.setStatus(dto.getStatus());

	    Policy policy = repo1.findById(dto.getPolicyId())
	                         .orElseThrow(() -> new ClaimNotFoundException("Policy not found"));
	    claim.setPolicy(policy);

	    return mapToDto(repo.save(claim));
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
