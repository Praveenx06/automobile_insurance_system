package com.hexaware.automobile.insurancesystem.service;

import java.util.List; 
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hexaware.automobile.insurancesystem.dto.ProposalDto;
import com.hexaware.automobile.insurancesystem.entities.Addon;
import com.hexaware.automobile.insurancesystem.entities.Proposal;
import com.hexaware.automobile.insurancesystem.entities.User;
import com.hexaware.automobile.insurancesystem.entities.Vehicle;
import com.hexaware.automobile.insurancesystem.exception.ProposalNotFoundException;
import com.hexaware.automobile.insurancesystem.repository.ProposalRepository;
import com.hexaware.automobile.insurancesystem.repository.UserRepository;
import com.hexaware.automobile.insurancesystem.repository.VehicleRepository;


import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ProposalServiceImp implements IProposalService {

    @Autowired
    private ProposalRepository repo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private VehicleRepository vehicleRepo;

    

    // Null-safe DTO mapping
    public ProposalDto mapToDto(Proposal proposal) {
        ProposalDto dto = new ProposalDto();
        dto.setProposalId(proposal.getProposalId());
        if (proposal.getVehicle() != null) dto.setVehicleId(proposal.getVehicle().getVehicleId());
        if (proposal.getUser() != null) dto.setUserId(proposal.getUser().getUserId());
        dto.setStatus(proposal.getStatus());
        return dto;
    }

    @Override
    public ProposalDto addProposal(ProposalDto proposalDto) {
        Proposal proposal = new Proposal();
        proposal.setProposalId(proposalDto.getProposalId());
        proposal.setStatus(proposalDto.getStatus());

        User user = userRepo.findById(proposalDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID " + proposalDto.getUserId()));
        proposal.setUser(user);

        Vehicle vehicle = vehicleRepo.findById(proposalDto.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found with ID " + proposalDto.getVehicleId()));
        proposal.setVehicle(vehicle);

        Proposal saved = repo.save(proposal);
        return mapToDto(saved);
    }

    @Override
    public ProposalDto updateProposal(ProposalDto dto) throws ProposalNotFoundException {
        Proposal existingProposal = repo.findById(dto.getProposalId())
            .orElseThrow(() -> new ProposalNotFoundException("Cannot find proposal with ID " + dto.getProposalId()));

        existingProposal.setStatus(dto.getStatus());

        User user = userRepo.findById(dto.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found with ID " + dto.getUserId()));
        existingProposal.setUser(user);

        Vehicle vehicle = vehicleRepo.findById(dto.getVehicleId())
            .orElseThrow(() -> new RuntimeException("Vehicle not found with ID " + dto.getVehicleId()));
        existingProposal.setVehicle(vehicle);

        vehicle.setProposal(existingProposal); // ✅ Sync reverse side of OneToOne

        Proposal saved = repo.save(existingProposal);
        return mapToDto(saved); // ✅ Return DTO directly
    }



    @Override
    public ProposalDto getByProposalId(int proposalId) throws ProposalNotFoundException {
        Proposal proposal = repo.findById(proposalId)
                .orElseThrow(() -> new ProposalNotFoundException("Proposal ID " + proposalId + " not found"));
        return mapToDto(proposal);
    }

    @Override
    public List<ProposalDto> getAllProposals() {
        return repo.findAll().stream()
                .filter(p -> p.getUser() != null && p.getVehicle() != null)
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
    @Transactional
    @Override
    public String deleteByProposalId(int proposalId) {
        Proposal proposal = repo.findById(proposalId)
            .orElseThrow(() -> new RuntimeException("Proposal not found with ID " + proposalId));

        // 🔹 Break ManyToMany relationship from both sides
        if (proposal.getAddOns() != null && !proposal.getAddOns().isEmpty()) {
            for (Addon addon : proposal.getAddOns()) {
                addon.getProposals().remove(proposal);
            }
            proposal.getAddOns().clear();
        }

        // 🔹 Break OneToOne relationships
        proposal.setQuote(null);
        proposal.setPolicy(null);

        // ✅ FIX: Clear the collection instead of nullifying
        if (proposal.getDocuments() != null && !proposal.getDocuments().isEmpty()) {
            proposal.getDocuments().clear(); // ✅ This avoids the orphan tracking error
        }

        // 🔹 Break ManyToOne relationships
        proposal.setUser(null);
        proposal.setVehicle(null);

        repo.save(proposal); // ✅ Persist relationship removals
        repo.delete(proposal); // ✅ Now safe to delete

        return "Record deleted successfully";
    }

    @Override
    public List<ProposalDto> getProposalsByUserId(int userId) {
        List<Proposal> proposals = repo.findByUser_UserId(userId);
        return proposals.stream()
            .map(this::mapToDto)
            .collect(Collectors.toList());
    }


}
