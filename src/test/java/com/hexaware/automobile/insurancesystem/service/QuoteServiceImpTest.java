package com.hexaware.automobile.insurancesystem.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexaware.automobile.insurancesystem.entities.Quote;


@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
class QuoteServiceImpTest {

    @Autowired
    private QuoteServiceImp quoteService;

    @Test
    @Order(1)
    public void testAddQuote() {
        Quote quote = new Quote();
        quote.setQuoteId(5001);
        quote.setPremiumAmount(25000.0);
        quote.setProposal(null);  // assuming nullable; else setup Proposal entity

        Quote saved = quoteService.addQuote(quote);
        assertNotNull(saved);
        assertEquals(5001, saved.getQuoteId());
        assertEquals(25000.0, saved.getPremiumAmount());
    }

    @Test
    @Order(2)
    public void testGetQuoteById() {
        Quote quote = quoteService.getQuoteById(5001);
        assertNotNull(quote);
        assertEquals(5001, quote.getQuoteId());
    }

    @Test
    @Order(3)
    public void testGetAllQuotes() {
        List<Quote> quotes = quoteService.getAllQuotes();
        assertNotNull(quotes);
        assertTrue(quotes.size() > 0);
    }

    @Test
    @Order(4)
    public void testUpdateQuote() {
        Quote quote = quoteService.getQuoteById(5001);
        quote.setPremiumAmount(30000.0);
        Quote updated = quoteService.updateQuote(quote);
        assertEquals(30000.0, updated.getPremiumAmount());
    }

    @Test
    @Order(5)
    public void testDeleteQuoteById() {
        String msg = quoteService.deleteQuoteById(5001);
        assertEquals("Quote deleted successfully", msg);
        assertThrows(Exception.class, () -> quoteService.getQuoteById(5001));
    }


}
