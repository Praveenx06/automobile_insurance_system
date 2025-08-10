package com.hexaware.automobile.insurancesystem.service;

import java.util.List;

import com.hexaware.automobile.insurancesystem.entities.Quote;
import com.hexaware.automobile.insurancesystem.exception.QuoteNotFoundException;

public interface IQuoteService {
	Quote addQuote(Quote quote);
    Quote updateQuote(Quote quote) throws QuoteNotFoundException;
    Quote getQuoteById(int quoteId) throws QuoteNotFoundException;
    List<Quote> getAllQuotes();
    String deleteQuoteById(int quoteId) ;

}
