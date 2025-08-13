package com.hexaware.automobile.insurancesystem.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.automobile.insurancesystem.entities.Proposal;
import com.hexaware.automobile.insurancesystem.service.IProposalService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api/proposals")
public class ProposalRestController {
	@Autowired
	IProposalService service;
	
	 @PreAuthorize("hasAuthority('ADMIN','USER')")
	@PostMapping("/add")
    public Proposal addProposal(@Valid @RequestBody Proposal proposal) {
        log.debug("Adding new proposal: ", proposal);
        return service.addProposal(proposal);
    }

	 @PreAuthorize("hasAuthority('ADMIN','USER')")
    @PutMapping("/update")
    public Proposal updateProposal(@Valid @RequestBody Proposal proposal)  {
        log.info("Updating proposal with ID: ", proposal.getProposalId());
        return service.updateProposal(proposal);
    }
    
    @PreAuthorize("hasAuthority('ADMIN','USER')")
    @GetMapping("/getById/{proposalId}")
    public Proposal getProposalById(@PathVariable int proposalId) {
        log.info("Retrieving proposal with ID: ", proposalId);
        return service.getByProposalId(proposalId);
    }

    
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/getAll")
    public List<Proposal> getAllProposals() {
        log.debug("Retrieving all proposals");
        return service.getAllProposals();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/deleteById/{proposalId}")
    public String deleteProposalById(@PathVariable int proposalId) {
        log.info("Deleting proposal with ID: ", proposalId);
        return service.deleteByProposalId(proposalId);
    }
	
	

}
