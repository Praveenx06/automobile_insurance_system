package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen    
 * Modified on : 1-Aug-2025
 * Description : proposal service implementation calss 
 * */
import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hexaware.automobile.insurancesystem.entities.Proposal;
import com.hexaware.automobile.insurancesystem.exception.ProposalNotFoundException;
import com.hexaware.automobile.insurancesystem.repository.ProposalRepository;
@Service
public class ProposalServiceImp implements IProposalService{

	@Autowired
	ProposalRepository repo;
	
	@Override
	public Proposal addProposal(Proposal proposal) {
		
		return repo.save(proposal);
	}

	@Override
	public Proposal updateProposal(Proposal proposal) throws ProposalNotFoundException {
		if(!repo.existsById(proposal.getProposalId())) {
			throw new ProposalNotFoundException("cannot find proposal");
		}
		return repo.save(proposal);
	}

	@Override
	public Proposal getByProposalId(int proposalId) throws ProposalNotFoundException {
		
		return repo.findById(proposalId).orElseThrow(() -> new ProposalNotFoundException("Proposal id "+ proposalId +"not found"));
	}

	@Override
	public List<Proposal> getAllProposals() {
		
		return repo.findAll();
	}

	@Override
	public String deleteByProposalId(int proposalId) {
		
		repo.deleteById(proposalId);
		return "Record deleted successfully";
	}


}
