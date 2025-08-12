package com.hexaware.automobile.insurancesystem.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexaware.automobile.insurancesystem.entities.Proposal;

@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
class ProposalServiceImpTest {

    @Autowired
    private ProposalServiceImp proposalService;

    @Test
    @Order(1)
    public void testAddProposal() {
        Proposal proposal = new Proposal();
        proposal.setProposalId(1001);
        proposal.setUser(null);      
        proposal.setVehicle(null);   
        proposal.setStatus("PENDING");

        Proposal saved = proposalService.addProposal(proposal);
        assertNotNull(saved);
        assertEquals(1001, saved.getProposalId());
        assertEquals("PENDING", saved.getStatus());
    }

    @Test
    @Order(2)
    public void testGetByProposalId() {
        Proposal proposal = proposalService.getByProposalId(1001);
        assertNotNull(proposal);
        assertEquals(1001, proposal.getProposalId());
    }

    @Test
    @Order(3)
    public void testGetAllProposals() {
        List<Proposal> proposals = proposalService.getAllProposals();
        assertNotNull(proposals);
        assertTrue(proposals.size() > 0);
    }

    @Test
    @Order(4)
    public void testUpdateProposal() {
        Proposal proposal = proposalService.getByProposalId(1001);
        proposal.setStatus("APPROVED");
        Proposal updated = proposalService.updateProposal(proposal);
        assertEquals("APPROVED", updated.getStatus());
    }

    @Test
    @Order(5)
    public void testDeleteByProposalId() {
        String result = proposalService.deleteByProposalId(1001);
        assertEquals("Record deleted successfully", result);

        assertThrows(Exception.class, () -> proposalService.getByProposalId(1001));
    }
}



