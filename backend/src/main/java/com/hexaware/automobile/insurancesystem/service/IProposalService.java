package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen   
 * Modified on : 01-Aug-2025
 * Description :IProposalService 
 * */
import java.util.List;

import com.hexaware.automobile.insurancesystem.dto.ProposalDto;
import com.hexaware.automobile.insurancesystem.entities.Proposal;


public interface IProposalService {
	public ProposalDto addProposal(ProposalDto proposalDto);
	public ProposalDto updateProposal(ProposalDto proposalDto) ;
	public ProposalDto getByProposalId(int proposalId) ;
	public List<ProposalDto> getAllProposals();
	public String deleteByProposalId(int proposalId);
	List<ProposalDto> getProposalsByUserId(int userId);

}
