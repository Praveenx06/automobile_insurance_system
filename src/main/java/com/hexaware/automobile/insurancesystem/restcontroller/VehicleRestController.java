package com.hexaware.automobile.insurancesystem.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.automobile.insurancesystem.entities.Vehicle;
import com.hexaware.automobile.insurancesystem.service.IVehicleService;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@RestController
@RequestMapping("/api/vehicles")
public class VehicleRestController {
	
	@Autowired
    private IVehicleService service;

    @PostMapping("/add")
    public Vehicle addVehicle(@RequestBody Vehicle vehicle) {
        log.debug("Adding new vehicle: ", vehicle);
        return service.addVehicle(vehicle);
    }

    @PostMapping("/update")
    public Vehicle updateVehicle(@RequestBody Vehicle vehicle) {
        log.info("Updating vehicle with ID: ");
        return service.updateVehicle(vehicle);
    }

    @GetMapping("/getById/{vehicleId}")
    public Vehicle getVehicleById(@PathVariable int vehicleId)  {
        log.info("Retrieving vehicle with ID: ", vehicleId);
        return service.getVehicleById(vehicleId);
    }

    @GetMapping("/getAll")
    public List<Vehicle> getAllVehicles() {
        log.debug("Retrieving all vehicles");
        return service.getAllVehicles();
    }

    @DeleteMapping("/deleteById/{vehicleId}")
    public String deleteVehicleById(@PathVariable int vehicleId)  {
        log.info("Deleting vehicle with ID: ", vehicleId);
        return service.deleteVehicleById(vehicleId);
    }

}
