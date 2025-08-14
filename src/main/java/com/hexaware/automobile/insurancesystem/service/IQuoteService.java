package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen   
 * Modified on : 01-Aug-2025
 * Description :IQuoteService 
 * */
import java.util.List; 

import com.hexaware.automobile.insurancesystem.entities.Quote;


public interface IQuoteService {
	Quote addQuote(Quote quote);
    Quote updateQuote(Quote quote) ;
    Quote getQuoteById(int quoteId) ;
    List<Quote> getAllQuotes();
    String deleteQuoteById(int quoteId) ;

}
