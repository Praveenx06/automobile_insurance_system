package com.hexaware.automobile.insurancesystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.automobile.insurancesystem.entities.Quote;
import com.hexaware.automobile.insurancesystem.exception.QuoteNotFoundException;
import com.hexaware.automobile.insurancesystem.repository.QuoteRepository;
@Service
public class QuoteServiceImp implements IQuoteService {

	 @Autowired
	    private QuoteRepository repo;
	
	@Override
	public Quote addQuote(Quote quote) {
		return repo.save(quote);
	}

	@Override
	public Quote updateQuote(Quote quote) throws QuoteNotFoundException {
		if (!repo.existsById(quote.getQuoteId())) {
            throw new QuoteNotFoundException("Cannot update ");
        }
        return repo.save(quote);
	}

	@Override
	public Quote getQuoteById(int quoteId) throws QuoteNotFoundException {
		return repo.findById(quoteId).orElseThrow(() -> new QuoteNotFoundException("Quote ID " + quoteId + " not found"));
	}

	@Override
	public List<Quote> getAllQuotes() {
		
		return repo.findAll();
	}

	@Override
	public String deleteQuoteById(int quoteId) {
	 repo.deleteById(quoteId);
		return "Quote deleted successfully";
	}

}
