///* Author : Praveen    
// * Modified on : 02-Aug-2025
// * Description : Policy service implementation calss 
// * */

package com.hexaware.automobile.insurancesystem.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.automobile.insurancesystem.dto.PolicyDto;
import com.hexaware.automobile.insurancesystem.entities.Claim;
import com.hexaware.automobile.insurancesystem.entities.Policy;
import com.hexaware.automobile.insurancesystem.entities.Proposal;
import com.hexaware.automobile.insurancesystem.exception.PolicyNotFoundException;
import com.hexaware.automobile.insurancesystem.repository.PolicyRepository;
import com.hexaware.automobile.insurancesystem.repository.ProposalRepository;

@Service
public class PolicyServiceImp implements IPolicyService {

    @Autowired
    private PolicyRepository repo;

    @Autowired
    private ProposalRepository proposalRepo;

    private PolicyDto mapToDto(Policy policy) {
        PolicyDto dto = new PolicyDto();
        dto.setPolicyId(policy.getPolicyId());
        dto.setProposalId(policy.getProposal() != null ? policy.getProposal().getProposalId() : 0);
        dto.setStartDate(policy.getStartDate());
        dto.setEndDate(policy.getEndDate());
        dto.setStatus(policy.getStatus());
        dto.setDescription(policy.getDescription());
        dto.setPrice(policy.getPrice());
        return dto;
    }

    private Policy mapToEntity(PolicyDto dto) {
        Policy policy = new Policy();
        policy.setPolicyId(dto.getPolicyId());
        policy.setStartDate(dto.getStartDate());
        policy.setEndDate(dto.getEndDate());
        policy.setStatus(dto.getStatus());
        policy.setDescription(dto.getDescription());
        policy.setPrice(dto.getPrice()); 

        if (dto.getProposalId() > 0) {
            Proposal proposal = proposalRepo.findById(dto.getProposalId())
                    .orElseThrow(() -> new RuntimeException(
                            "Proposal not found with id: " + dto.getProposalId()));

            // Check if a policy already exists for this proposal
            if (repo.existsByProposal(proposal)) {
                throw new RuntimeException(
                        "Policy already exists for proposal id: " + dto.getProposalId());
            }

            policy.setProposal(proposal);
        } else {
            throw new RuntimeException("Proposal id must be provided");
        }

        return policy;
    }

    @Override
    public PolicyDto addPolicy(PolicyDto policyDto) {
        if (repo.existsById(policyDto.getPolicyId())) {
            throw new RuntimeException("Policy ID already exists: " + policyDto.getPolicyId());
        }
        Policy saved = repo.save(mapToEntity(policyDto));
        return mapToDto(saved);
    }

    @Override
    public PolicyDto getPolicyById(int policyId) throws PolicyNotFoundException {
        Policy policy = repo.findById(policyId)
                .orElseThrow(() -> new PolicyNotFoundException("Policy id " + policyId + " not found"));
        return mapToDto(policy);
    }

    @Override
    public List<PolicyDto> getAllPolicies() {
        return repo.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public PolicyDto updatePolicy(PolicyDto dto) throws PolicyNotFoundException {
        Policy existing = repo.findById(dto.getPolicyId())
                .orElseThrow(() -> new PolicyNotFoundException("Cannot update, policy not found"));
        
        // Update fields
        existing.setStartDate(dto.getStartDate());
        existing.setEndDate(dto.getEndDate());
        existing.setStatus(dto.getStatus());
        existing.setDescription(dto.getDescription());  
        existing.setPrice(dto.getPrice()); 
        
        
        if (dto.getProposalId() > 0) {
            Proposal proposal = proposalRepo.findById(dto.getProposalId())
                    .orElseThrow(() -> new RuntimeException("Proposal not found"));
            existing.setProposal(proposal);
        }

        return mapToDto(repo.save(existing));
    }

    @Override
    public String deletePolicyById(int policyId) {
        Policy policy = repo.findById(policyId)
            .orElseThrow(() -> new PolicyNotFoundException("Policy not found"));

        // Break relationship with Proposal
        if (policy.getProposal() != null) {
            Proposal proposal = policy.getProposal();
            proposal.setPolicy(null); // Only if Proposal has a policy field
            policy.setProposal(null);
        }

        // Break relationship with Claims
        if (policy.getClaims() != null) {
            for (Claim claim : policy.getClaims()) {
                claim.setPolicy(null); // Break back-reference
            }
            policy.getClaims().clear(); // Remove all claims
        }

        repo.delete(policy);
        return "Record deleted successfully";
    }


}
