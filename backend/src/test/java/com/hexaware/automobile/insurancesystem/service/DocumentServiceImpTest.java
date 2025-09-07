package com.hexaware.automobile.insurancesystem.service;

/* Author : Praveen   
 * Modified on : 30-Aug-2025
 * Description : Corrected DocumentServiceImpTest for DTO-based service
 */

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
import com.hexaware.automobile.insurancesystem.entities.Proposal;
import com.hexaware.automobile.insurancesystem.repository.ProposalRepository;

@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
class DocumentServiceImpTest {

    @Autowired
    private DocumentServiceImp documentService;

    @Autowired
    private ProposalRepository proposalRepository;

    @Test
    @Order(1)
    public void testAddDocument() {
        // Ensure proposal exists
        Proposal proposal = new Proposal();
        proposal.setProposalId(1001);
        proposalRepository.save(proposal);

        // Create DocumentDto
        DocumentDto dto = new DocumentDto();
        dto.setDocId(1);
        dto.setDocType("Driving License");
        dto.setProposalId(1001);

        DocumentDto savedDocument = documentService.addDocument(dto);
        assertNotNull(savedDocument);
        assertEquals("Driving License", savedDocument.getDocType());
    }

    @Test
    @Order(2)
    public void testGetDocumentById() {
        DocumentDto document = documentService.getDocumentById(1);
        assertNotNull(document);
        assertEquals(1, document.getDocId());
    }

    @Test
    @Order(3)
    public void testGetAllDocuments() {
        List<DocumentDto> documents = documentService.getAllDocuments();
        assertTrue(documents.size() > 0);
    }

    @Test
    @Order(4)
    public void testUpdateDocument() {
        DocumentDto dto = new DocumentDto();
        dto.setDocId(1);
        dto.setDocType("Updated License");
        dto.setProposalId(1001);

        DocumentDto updatedDocument = documentService.updateDocument(dto);
        assertEquals("Updated License", updatedDocument.getDocType());
    }

    @Test
    @Order(5)
    public void testGetDocumentsByProposalId() {
        List<DocumentDto> documents = documentService.getDocumentsByProposalId(1001);
        assertTrue(documents.size() > 0);
    }

    @Test
    @Order(6)
    public void testDeleteDocumentById() {
        String result = documentService.deleteDocumentById(1);
        assertEquals("Record deleted successfully", result); // match your service implementation
    }
}
