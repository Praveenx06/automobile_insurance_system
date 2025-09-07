package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen    
 * Modified on : 1-Aug-2025
 * Description : Quote service implementation calss 
 * */
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.automobile.insurancesystem.dto.QuoteDto;
import com.hexaware.automobile.insurancesystem.entities.Proposal;
import com.hexaware.automobile.insurancesystem.entities.Quote;

import com.hexaware.automobile.insurancesystem.repository.ProposalRepository;
import com.hexaware.automobile.insurancesystem.repository.QuoteRepository;

import jakarta.transaction.Transactional;
@Service
public class QuoteServiceImp implements IQuoteService {

	 @Autowired
	    private QuoteRepository repo;
	 
	   @Autowired
	    private ProposalRepository proposalRepo;

	    // ✅ Convert Entity → DTO
	    private QuoteDto convertToDto(Quote quote) {
	        return new QuoteDto(
	                quote.getQuoteId(),
	                quote.getPremiumAmount(),
	                quote.getProposal().getProposalId()
	        );
	    }
	
	    @Override
	    public QuoteDto addQuote(QuoteDto dto) {
	        Proposal proposal = proposalRepo.findById(dto.getProposalId())
	                .orElseThrow(() -> new RuntimeException("Proposal not found with ID: " + dto.getProposalId()));

	        Quote quote = new Quote();
	        quote.setQuoteId(dto.getQuoteId());
	        quote.setPremiumAmount(dto.getPremiumAmount());
	        quote.setProposal(proposal);

	        return convertToDto(repo.save(quote));
	    }

	    @Override
	    public QuoteDto updateQuote(QuoteDto dto) {
	        if (!repo.existsById(dto.getQuoteId())) {
	            throw new RuntimeException("Quote not found with ID: " + dto.getQuoteId());
	        }

	        Proposal proposal = proposalRepo.findById(dto.getProposalId())
	                .orElseThrow(() -> new RuntimeException("Proposal not found with ID: " + dto.getProposalId()));

	        Quote quote = new Quote();
	        quote.setQuoteId(dto.getQuoteId());
	        quote.setPremiumAmount(dto.getPremiumAmount());
	        quote.setProposal(proposal);

	        return convertToDto(repo.save(quote));
	    }

	    @Override
	    public QuoteDto getQuoteById(int quoteId) {
	        Quote quote = repo.findById(quoteId)
	                .orElseThrow(() -> new RuntimeException("Quote not found with ID: " + quoteId));
	        return convertToDto(quote);
	    }

	 @Override
	    public List<QuoteDto> getAllQuotes() {
	        return repo.findAll().stream()
	                .map(this::convertToDto)
	                .collect(Collectors.toList());
	    }

	 

	 @Override
	 @Transactional
	 public String deleteQuoteById(int quoteId) {
	     Quote quote = repo.findById(quoteId)
	             .orElseThrow(() -> new RuntimeException("Quote not found with ID: " + quoteId));

	     // break the FK relation
	     quote.setProposal(null);
	     repo.save(quote);

	     repo.delete(quote);
	     repo.flush();
	     return "Quote deleted successfully";
	 }
}
