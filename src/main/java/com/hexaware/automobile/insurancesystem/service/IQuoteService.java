package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen   
 * Modified on : 01-Aug-2025
 * Description :IQuoteService 
 * */
import java.util.List;

import com.hexaware.automobile.insurancesystem.dto.QuoteDto;



public interface IQuoteService {
	QuoteDto addQuote(QuoteDto dto);
    QuoteDto updateQuote(QuoteDto dto) ;
    QuoteDto getQuoteById(int quoteId) ;
    List<QuoteDto> getAllQuotes();
    String deleteQuoteById(int quoteId) ;

}
