package com.hexaware.automobile.insurancesystem.service;

import java.util.List;

import com.hexaware.automobile.insurancesystem.entities.Proposal;
import com.hexaware.automobile.insurancesystem.exception.ProposalNotFoundException;

public interface IProposalService {
	public Proposal addProposal(Proposal proposal);
	public Proposal updateProposal(Proposal proposal) throws ProposalNotFoundException;
	public Proposal getByProposalId(int proposalId) throws ProposalNotFoundException;
	public List<Proposal> getAllProposals();
	public String deleteByProposalId(int proposalId);

}
