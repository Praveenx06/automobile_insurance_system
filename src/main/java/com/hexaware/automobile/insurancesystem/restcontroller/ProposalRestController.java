package com.hexaware.automobile.insurancesystem.restcontroller;
/* Author : Praveen   
 * Modified on : 2-Aug-2025
 * Description : Proposal restcontroller with endpoints
 * */
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.automobile.insurancesystem.dto.ProposalDto;
import com.hexaware.automobile.insurancesystem.entities.Proposal;
import com.hexaware.automobile.insurancesystem.service.IProposalService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
@CrossOrigin(origins ="http://localhost:5173/")
@RestController
@Slf4j
@RequestMapping("/api/proposals")
public class ProposalRestController {
	@Autowired
	IProposalService service;
	
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	@PostMapping("/add")
   
	 public ResponseEntity<ProposalDto> addProposal(@Valid @RequestBody ProposalDto proposalDto) {
		 log.debug("Adding new proposal: ", proposalDto);
	        ProposalDto saved = service.addProposal(proposalDto);
	        return ResponseEntity.ok(saved);
	    }

	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	@PutMapping("/update")
	public ResponseEntity<ProposalDto> updateProposal(@Valid @RequestBody ProposalDto proposalDto) {
	    log.info("Updating proposal with ID: {}", proposalDto.getProposalId());
	    ProposalDto updated = service.updateProposal(proposalDto);
	    return ResponseEntity.ok(updated);
	}
    
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/getById/{proposalId}")
    public ProposalDto getProposalById(@PathVariable int proposalId) {
        log.info("Retrieving proposal with ID: ", proposalId);
        return service.getByProposalId(proposalId);
    }

    
	@PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/getAll")
    public List<ProposalDto> getAllProposals() {
        log.debug("Retrieving all proposals");
        return service.getAllProposals();
    }

	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @DeleteMapping("/deleteById/{proposalId}")
    public String deleteProposalById(@PathVariable int proposalId) {
        log.info("Deleting proposal with ID: ", proposalId);
        return service.deleteByProposalId(proposalId);
    }
	
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	@GetMapping("/getByUser/{userId}")
	public List<ProposalDto> getProposalsByUserId(@PathVariable int userId) {
	    log.info("Fetching proposals for user ID: {}", userId);
	    return service.getProposalsByUserId(userId);
	}

	
	

}
