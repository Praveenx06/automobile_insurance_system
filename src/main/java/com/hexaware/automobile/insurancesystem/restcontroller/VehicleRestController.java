package com.hexaware.automobile.insurancesystem.restcontroller;
/* Author : Praveen   
 * Modified on : 3-Aug-2025
 * Description : Vehicle restcontroller with endpoints
 * */
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.automobile.insurancesystem.dto.VehicleDto;
import com.hexaware.automobile.insurancesystem.entities.Vehicle;
import com.hexaware.automobile.insurancesystem.service.IVehicleService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@CrossOrigin(origins ="http://localhost:5173/")
@RestController
@RequestMapping("/api/vehicles")
public class VehicleRestController {
	
	@Autowired
    private IVehicleService service;
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/add")
    public Vehicle addVehicle(@Valid @RequestBody VehicleDto dto) {
        log.debug("Adding new vehicle: ", dto);
        return service.addVehicle(dto);
    }
	 
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PutMapping("/update")
    public Vehicle updateVehicle(@RequestBody Vehicle vehicle) {
        log.info("Updating vehicle with ID: ");
        return service.updateVehicle(vehicle);
    }
    
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/getById/{vehicleId}")
    public VehicleDto getVehicleById(@PathVariable int vehicleId)  {
        log.info("Retrieving vehicle with ID: ", vehicleId);
        return service.getVehicleById(vehicleId);
    }
    
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/getAll")
    public List<VehicleDto> getAllVehicles() {
        log.debug("Retrieving all vehicles");
        return service.getAllVehicles();
    }
    
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @DeleteMapping("/deleteById/{vehicleId}")
    public String deleteVehicleById(@PathVariable int vehicleId)  {
        log.info("Deleting vehicle with ID: ", vehicleId);
        return service.deleteVehicleById(vehicleId);
    }
    
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/type/{type}")
    public ResponseEntity<List<VehicleDto>> getVehiclesByType(@PathVariable String type) {
    	log.info("getting vehicle by type " );
        List<VehicleDto> vehicles = service.getVehiclesByType(type);
        return ResponseEntity.ok(vehicles);
    }

}
