package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen   
 * Modified on : 11-Aug-2025
 * Description : DocumentServiceImpTest
 * */
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexaware.automobile.insurancesystem.dto.DocumentDto;
import com.hexaware.automobile.insurancesystem.entities.Document;
import com.hexaware.automobile.insurancesystem.entities.Proposal;
import com.hexaware.automobile.insurancesystem.repository.ProposalRepository;
@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
class DocumentServiceImpTest {
	 @Autowired
	     DocumentServiceImp documentService;

	    @Autowired
	    private ProposalRepository proposalRepository; // To ensure proposal exists before testing

	    @Test
	    @Order(1)
	    public void testAddDocument() {
	        Proposal proposal = new Proposal();
	        proposal.setProposalId(1001);
	        proposalRepository.save(proposal);

	        DocumentDto dto = new DocumentDto();
	        dto.setDocId(1);
	        dto.setDocType("Driving License");
	        dto.setProposalId(1001);

	        Document savedDocument = documentService.addDocument(dto);
	        assertNotNull(savedDocument);
	        assertEquals("Driving License", savedDocument.getDocType());
	    }

	    @Test
	    @Order(2)
	    public void testGetDocumentById() {
	        Document document = documentService.getDocumentById(1);
	        assertNotNull(document);
	        assertEquals(1, document.getDocId());
	    }

	    @Test
	    @Order(3)
	    public void testGetAllDocuments() {
	        List<Document> documents = documentService.getAllDocuments();
	        assertTrue(documents.size() > 0);
	    }

	    @Test
	    @Order(4)
	    public void testUpdateDocument() {
	        Document document = documentService.getDocumentById(1);
	        document.setDocType("Updated License");
	        Document updatedDocument = documentService.updateDocument(document);
	        assertEquals("Updated License", updatedDocument.getDocType());
	    }

	    @Test
	    @Order(5)
	    public void testGetDocumentsByProposalId() {
	        List<Document> documents = documentService.getDocumentsByProposalId(1001);
	        assertTrue(documents.size() > 0);
	    }

	    @Test
	    @Order(6)
	    public void testDeleteDocumentById() {
	        String result = documentService.deleteDocumentById(1);
	        assertEquals("Record deleted successfully", result);
	    }

	
}
