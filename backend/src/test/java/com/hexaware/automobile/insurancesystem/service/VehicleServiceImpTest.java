package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen   
 * Modified on : 12-Aug-2025
 * Description : VehicleServiceImpTest
 */

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexaware.automobile.insurancesystem.dto.VehicleDto;
import com.hexaware.automobile.insurancesystem.entities.Vehicle;
import com.hexaware.automobile.insurancesystem.exception.VehicleNotFoundException;

@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
class VehicleServiceImpTest {

    @Autowired
    private VehicleServiceImp vehicleService;

    private static final int TEST_VEHICLE_ID = 3001;
    private static final String TEST_VEHICLE_TYPE = "CAR";

    @Test
    @Order(1)
    public void testAddVehicle() {
        VehicleDto dto = new VehicleDto();
        dto.setVehicleId(TEST_VEHICLE_ID);
        dto.setType(TEST_VEHICLE_TYPE);
        dto.setModel("TestModel");
        dto.setYear(2022);

        Vehicle saved = vehicleService.addVehicle(dto);
        assertNotNull(saved);
        assertEquals(TEST_VEHICLE_ID, saved.getVehicleId());
        assertEquals(TEST_VEHICLE_TYPE, saved.getType());
    }

    @Test
    @Order(2)
    public void testGetVehicleById() {
        VehicleDto vehicle = vehicleService.getVehicleById(TEST_VEHICLE_ID);
        assertNotNull(vehicle);
        assertEquals(TEST_VEHICLE_ID, vehicle.getVehicleId());
    }

    @Test
    @Order(3)
    public void testGetAllVehicles() {
        List<VehicleDto> vehicles = vehicleService.getAllVehicles();
        assertNotNull(vehicles);
        assertTrue(vehicles.size() > 0);
    }

    @Test
    @Order(4)
    public void testUpdateVehicle() throws VehicleNotFoundException {
        VehicleDto dto = vehicleService.getVehicleById(TEST_VEHICLE_ID);
        dto.setModel("UpdatedModel");

        // Convert DTO to Entity for update
        Vehicle entity = new Vehicle();
        entity.setVehicleId(dto.getVehicleId());
        entity.setModel(dto.getModel());
        entity.setType(dto.getType());
        entity.setYear(dto.getYear());

        Vehicle updated = vehicleService.updateVehicle(entity);
        assertEquals("UpdatedModel", updated.getModel());
    }

    @Test
    @Order(5)
    public void testGetVehiclesByType() {
        List<VehicleDto> vehicles = vehicleService.getVehiclesByType(TEST_VEHICLE_TYPE);
        assertNotNull(vehicles);
        assertTrue(vehicles.stream().anyMatch(v -> v.getVehicleId() == TEST_VEHICLE_ID));
    }

    @Test
    @Order(6)
    public void testDeleteVehicleById() {
        String msg = vehicleService.deleteVehicleById(TEST_VEHICLE_ID);
        assertEquals("Vehicle deleted successfully", msg);
        assertThrows(VehicleNotFoundException.class, () -> vehicleService.getVehicleById(TEST_VEHICLE_ID));
    }
}
