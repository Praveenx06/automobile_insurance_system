package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen   
 * Modified on : 11-Aug-2025
 * Description : ClaimServiceImpTest
 * */
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexaware.automobile.insurancesystem.dto.ClaimDto;
import com.hexaware.automobile.insurancesystem.entities.Claim;
import com.hexaware.automobile.insurancesystem.entities.Policy;
import com.hexaware.automobile.insurancesystem.repository.PolicyRepository;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class ClaimServiceImpTest {

    @Autowired
    private ClaimServiceImp claimService;

    @Autowired
    private PolicyRepository policyRepo;

    @Test
    @Order(1)
    public void testAddClaim() {
        // Create a policy first (because claim needs a policyId)
        Policy policy = new Policy();
        policy.setPolicyId(100);
        policyRepo.save(policy);

        ClaimDto dto = new ClaimDto();
        dto.setClaimId(500);
        dto.setPolicyId(100);
        dto.setClaimDate(LocalDate.now());
        dto.setClaimReason("Accident damage");
        dto.setStatus("PENDING");

        ClaimDto savedClaim = claimService.addClaim(dto);
        assertNotNull(savedClaim);
        assertEquals("PENDING", savedClaim.getStatus());
    }

    @Test
    @Order(2)
    public void testGetClaimById() {
        ClaimDto claim = claimService.getClaimById(500);
        assertNotNull(claim);
        assertEquals("PENDING", claim.getStatus());
    }

    @Test
    @Order(3)
    public void testGetAllClaims() {
        List<ClaimDto> claims = claimService.getAllClaims();
        assertTrue(claims.size() > 0);
    }

    @Test
    @Order(4)
    public void testUpdateClaim() {
        ClaimDto claim = claimService.getClaimById(500);
        claim.setStatus("APPROVED");
        ClaimDto updatedClaim = claimService.updateClaim(claim);
        assertEquals("APPROVED", updatedClaim.getStatus());
    }

    @Test
    @Order(5)
    public void testGetClaimsBetweenDates() {
        LocalDate start = LocalDate.now().minusDays(1);
        LocalDate end = LocalDate.now().plusDays(1);
        List<Claim> claims = claimService.getClaimsBetweenDates(start, end);
        assertTrue(claims.size() > 0);
    }

    @Test
    @Order(6)
    public void testDeleteClaimById() {
        String result = claimService.deleteClaimById(500);
        assertEquals("Record deleted successfully", result);
    }
}
