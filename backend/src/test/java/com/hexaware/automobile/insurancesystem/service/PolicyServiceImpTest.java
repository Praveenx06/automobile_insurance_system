package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen   
 * Modified on : 11-Aug-2025
 * Description : PolicyServiceImpTest (DTO-based)
 */
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexaware.automobile.insurancesystem.dto.PolicyDto;

@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
class PolicyServiceImpTest {

    @Autowired
    private PolicyServiceImp policyService;

    @Test
    @Order(1)
    public void testAddPolicy() {
        PolicyDto dto = new PolicyDto();
        dto.setPolicyId(101);
        dto.setProposalId(0); // no proposal for now
        dto.setStartDate(LocalDate.now().plusDays(1));
        dto.setEndDate(LocalDate.now().plusDays(365));
        dto.setStatus("ACTIVE");

        PolicyDto saved = policyService.addPolicy(dto);
        assertNotNull(saved);
        assertEquals(101, saved.getPolicyId());
        assertEquals("ACTIVE", saved.getStatus());
    }

    @Test
    @Order(2)
    public void testGetPolicyById() {
        PolicyDto dto = policyService.getPolicyById(101);
        assertNotNull(dto);
        assertEquals(101, dto.getPolicyId());
    }

    @Test
    @Order(3)
    public void testGetAllPolicies() {
        List<PolicyDto> policies = policyService.getAllPolicies();
        assertNotNull(policies);
        assertTrue(policies.size() > 0);
    }

    @Test
    @Order(4)
    public void testUpdatePolicy() {
        PolicyDto dto = policyService.getPolicyById(101);
        dto.setStatus("EXPIRED");
        PolicyDto updated = policyService.updatePolicy(dto);
        assertEquals("EXPIRED", updated.getStatus());
    }

    @Test
    @Order(5)
    public void testDeletePolicyById() {
        String msg = policyService.deletePolicyById(101);
        assertEquals("Record deleted successfully", msg);

        assertThrows(Exception.class, () -> policyService.getPolicyById(101));
    }
}
