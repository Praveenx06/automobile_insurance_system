package com.hexaware.automobile.insurancesystem.restcontroller;
/* Author : Praveen   
 * Modified on : 3-Aug-2025
 * Description : Quote restcontroller with endpoints
 * */
import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.automobile.insurancesystem.dto.QuoteDto;
import com.hexaware.automobile.insurancesystem.service.IQuoteService;

import lombok.extern.slf4j.Slf4j;
@CrossOrigin(origins ="http://localhost:5173/")
@Slf4j
@RestController
@RequestMapping("/api/quote")
public class QuoteRestController {
	
	 @Autowired
	    private IQuoteService service;
	 @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	   @PostMapping("/add")
	    public QuoteDto addQuote(@RequestBody QuoteDto dto) {
		 log.info("new quote added");
	        return service.addQuote(dto);
	    }
	 
	 @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	 @PutMapping("/update")
	    public QuoteDto updateQuote(@RequestBody QuoteDto dto) {
		 log.info(" quote updated");
	        return service.updateQuote(dto);
	    }
	 
	 @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	    @GetMapping("/getById/{quoteId}")
	    public QuoteDto getQuoteById(@PathVariable int quoteId)  {
	        log.info("Retrieving quote with ID: ", quoteId);
	        return service.getQuoteById(quoteId);
	    }
	    
	 @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	    @GetMapping("/getAll")
	    public List<QuoteDto> getAllQuotes() {
	        log.debug("Retrieving all quotes");
	        return service.getAllQuotes();
	    }
	    
	 @PreAuthorize("hasAnyRole('ADMIN')")
	    @DeleteMapping("/deleteById/{quoteId}")
	    public String deleteQuoteById(@PathVariable int quoteId)  {
	        log.info("Deleting quote with ID: ", quoteId);
	        return service.deleteQuoteById(quoteId);
	    }

}
