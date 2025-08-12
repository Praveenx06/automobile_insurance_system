package com.hexaware.automobile.insurancesystem.service;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexaware.automobile.insurancesystem.entities.Policy;

@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
class PolicyServiceImpTest {

    @Autowired
     PolicyServiceImp policyService;

    @Test
    @Order(1)
    public void testAddPolicy() {
        Policy policy = new Policy();
        policy.setPolicyId(101);
        policy.setProposal(null);
        policy.setStartDate(LocalDate.now().plusDays(1));
        policy.setEndDate(LocalDate.now().plusDays(365));
        policy.setStatus("ACTIVE");

        Policy saved = policyService.addPolicy(policy);
        assertNotNull(saved);
        assertEquals(101, saved.getPolicyId());
        assertEquals("ACTIVE", saved.getStatus());
    }

    @Test
    @Order(2)
    public void testGetPolicyById() {
        Policy policy = policyService.getPolicyById(101);
        assertNotNull(policy);
        assertEquals(101, policy.getPolicyId());
    }

    @Test
    @Order(3)
    public void testGetAllPolicies() {
        List<Policy> policies = policyService.getAllPolicies();
        assertNotNull(policies);
        assertTrue(policies.size() > 0);
    }

    @Test
    @Order(4)
    public void testUpdatePolicy() {
        Policy policy = policyService.getPolicyById(101);
        policy.setStatus("EXPIRED");
        Policy updated = policyService.updatePolicy(policy);
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
