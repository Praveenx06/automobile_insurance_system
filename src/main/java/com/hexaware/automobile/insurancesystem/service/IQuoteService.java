package com.hexaware.automobile.insurancesystem.service;

import java.util.List; 

import com.hexaware.automobile.insurancesystem.entities.Quote;


public interface IQuoteService {
	Quote addQuote(Quote quote);
    Quote updateQuote(Quote quote) ;
    Quote getQuoteById(int quoteId) ;
    List<Quote> getAllQuotes();
    String deleteQuoteById(int quoteId) ;

}
