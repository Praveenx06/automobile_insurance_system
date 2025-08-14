package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen   
 * Modified on : 01-Aug-2025
 * Description :IProposalService 
 * */
import java.util.List;


import com.hexaware.automobile.insurancesystem.entities.Proposal;


public interface IProposalService {
	public Proposal addProposal(Proposal proposal);
	public Proposal updateProposal(Proposal proposal) ;
	public Proposal getByProposalId(int proposalId) ;
	public List<Proposal> getAllProposals();
	public String deleteByProposalId(int proposalId);

}
