package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen   
 * Modified on : 12-Aug-2025
 * Description : QuoteServiceImpTest (DTO based)
 */

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexaware.automobile.insurancesystem.dto.QuoteDto;

@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
class QuoteServiceImpTest {

    @Autowired
    private QuoteServiceImp quoteService;

    @Test
    @Order(1)
    public void testAddQuote() {
        QuoteDto dto = new QuoteDto(5001, 25000.0, 1001);  // ✅ Use existing proposalId (ensure 1001 exists in DB)
        QuoteDto saved = quoteService.addQuote(dto);

        assertNotNull(saved);
        assertEquals(5001, saved.getQuoteId());
        assertEquals(25000.0, saved.getPremiumAmount());
        assertEquals(1001, saved.getProposalId());
    }

    @Test
    @Order(2)
    public void testGetQuoteById() {
        QuoteDto dto = quoteService.getQuoteById(5001);

        assertNotNull(dto);
        assertEquals(5001, dto.getQuoteId());
    }

    @Test
    @Order(3)
    public void testGetAllQuotes() {
        List<QuoteDto> quotes = quoteService.getAllQuotes();

        assertNotNull(quotes);
        assertTrue(quotes.size() > 0);
    }

    @Test
    @Order(4)
    public void testUpdateQuote() {
        QuoteDto dto = quoteService.getQuoteById(5001);
        dto.setPremiumAmount(30000.0);

        QuoteDto updated = quoteService.updateQuote(dto);
        assertEquals(30000.0, updated.getPremiumAmount());
    }

    @Test
    @Order(5)
    public void testDeleteQuoteById() {
        String msg = quoteService.deleteQuoteById(5001);

        assertEquals("Quote deleted successfully", msg);

        Exception ex = assertThrows(RuntimeException.class, () -> quoteService.getQuoteById(5001));
        assertTrue(ex.getMessage().contains("Quote not found with ID"));
    }
}
