package com.hexaware.automobile.insurancesystem.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.automobile.insurancesystem.entities.Quote;
import com.hexaware.automobile.insurancesystem.service.IQuoteService;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@RestController
@RequestMapping("/api/quote")
public class QuoteRestController {
	
	 @Autowired
	    private IQuoteService service;

	    @PostMapping("/add")
	    public Quote addQuote(@RequestBody Quote quote) {
	        log.debug("Adding new quote: ", quote);
	        return service.addQuote(quote);
	    }

	    @PostMapping("/update")
	    public Quote updateQuote(@RequestBody Quote quote)  {
	        log.info("Updating quote with ID: ");
	        return service.updateQuote(quote);
	    }

	    @GetMapping("/getById/{quoteId}")
	    public Quote getQuoteById(@PathVariable int quoteId)  {
	        log.info("Retrieving quote with ID: ", quoteId);
	        return service.getQuoteById(quoteId);
	    }

	    @GetMapping("/getAll")
	    public List<Quote> getAllQuotes() {
	        log.debug("Retrieving all quotes");
	        return service.getAllQuotes();
	    }

	    @DeleteMapping("/deleteById/{quoteId}")
	    public String deleteQuoteById(@PathVariable int quoteId)  {
	        log.info("Deleting quote with ID: ", quoteId);
	        return service.deleteQuoteById(quoteId);
	    }

}
