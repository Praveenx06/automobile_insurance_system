package com.hexaware.automobile.insurancesystem.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexaware.automobile.insurancesystem.dto.ProposalDto;
import com.hexaware.automobile.insurancesystem.exception.ProposalNotFoundException;

@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
class ProposalServiceImpTest {

    @Autowired
    private ProposalServiceImp proposalService;

    @Test
    @Order(1)
    public void testAddProposal() {
        ProposalDto dto = new ProposalDto();
        dto.setProposalId(1005);
        dto.setUserId(502);       // must exist in DB
        dto.setVehicleId(2);      // must exist in DB
        dto.setStatus("PENDING");

        ProposalDto saved = proposalService.addProposal(dto);
        assertNotNull(saved);
        assertEquals(1005, saved.getProposalId());
        assertEquals("PENDING", saved.getStatus());
    }

    @Test
    @Order(2)
    public void testGetByProposalId() {
        ProposalDto proposal = proposalService.getByProposalId(1005);
        assertNotNull(proposal);
        assertEquals(1005, proposal.getProposalId());
    }

    @Test
    @Order(3)
    public void testGetAllProposals() {
        List<ProposalDto> proposals = proposalService.getAllProposals();
        assertNotNull(proposals);
        assertTrue(proposals.size() > 0);
    }

    @Test
    @Order(4)
    public void testUpdateProposal() throws ProposalNotFoundException {
        ProposalDto dto = new ProposalDto();
        dto.setProposalId(1005);
        dto.setUserId(502);       // must exist in DB
        dto.setVehicleId(2);      // must exist in DB
        dto.setStatus("APPROVED");

        ProposalDto updated = proposalService.updateProposal(dto);
        assertNotNull(updated);
        assertEquals("APPROVED", updated.getStatus());
    }

    @Test
    @Order(5)
    public void testDeleteByProposalId() {
        String result = proposalService.deleteByProposalId(1005);
        assertEquals("Record deleted successfully", result);

        assertThrows(ProposalNotFoundException.class, () -> proposalService.getByProposalId(1005));
    }
}
