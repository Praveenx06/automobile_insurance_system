package com.hexaware.automobile.insurancesystem.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.automobile.insurancesystem.entities.Proposal;
import com.hexaware.automobile.insurancesystem.service.IProposalService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api/proposals")
public class ProposalRestController {
	@Autowired
	IProposalService service;
	 
	@PostMapping("/add")
    public Proposal addProposal(@RequestBody Proposal proposal) {
        log.debug("Adding new proposal: ", proposal);
        return service.addProposal(proposal);
    }

    @PostMapping("/update")
    public Proposal updateProposal(@RequestBody Proposal proposal)  {
        log.info("Updating proposal with ID: ", proposal.getProposalId());
        return service.updateProposal(proposal);
    }

    @GetMapping("/getById/{proposalId}")
    public Proposal getProposalById(@PathVariable int proposalId) {
        log.info("Retrieving proposal with ID: ", proposalId);
        return service.getByProposalId(proposalId);
    }

    @GetMapping("/getAll")
    public List<Proposal> getAllProposals() {
        log.debug("Retrieving all proposals");
        return service.getAllProposals();
    }

    @DeleteMapping("/deleteById/{proposalId}")
    public String deleteProposalById(@PathVariable int proposalId) {
        log.info("Deleting proposal with ID: ", proposalId);
        return service.deleteByProposalId(proposalId);
    }
	
	

}
