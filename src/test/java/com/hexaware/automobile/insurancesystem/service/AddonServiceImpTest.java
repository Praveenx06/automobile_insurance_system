package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen   
 * Modified on : 11-Aug-2025
 * Description : AddonServiceImpTest
 * */
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.hexaware.automobile.insurancesystem.dto.AddonDto;
import com.hexaware.automobile.insurancesystem.entities.Addon;

class AddonServiceImpTest {

    @Autowired
     AddonServiceImp addonService;

    @Test
    @Order(1)
    public void testAddAddon() {
        AddonDto dto = new AddonDto();
        dto.setName("Roadside Assistance");
        dto.setAdditionalCost(500.0);

        Addon savedAddon = addonService.addAddon(dto);
        assertNotNull(savedAddon);
        assertEquals("Roadside Assistance", savedAddon.getName());
    }

    @Test
    @Order(2)
    public void testGetAddonById() {
        Addon addon = addonService.getAddonById(1); 
        assertNotNull(addon);
        assertEquals(1, addon.getAddOnId());
    }

    @Test
    @Order(3)
    public void testGetAllAddons() {
        List<Addon> addons = addonService.getAllAddons();
        assertTrue(addons.size() > 0);
    }

    @Test
    @Order(4)
    public void testUpdateAddon() {
        Addon addon = addonService.getAddonById(1); 
        addon.setAdditionalCost(750.0);
        Addon updatedAddon = addonService.updateAddon(addon);
        assertEquals(750.0, updatedAddon.getAdditionalCost());
    }

    @Test
    @Order(5)
    public void testDeleteAddonById() {
        String result = addonService.deleteAddonById(1); 
        assertEquals("Record deleted successfully", result);
    }

	
}
