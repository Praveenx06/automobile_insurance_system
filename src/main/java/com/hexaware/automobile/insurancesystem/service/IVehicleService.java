package com.hexaware.automobile.insurancesystem.service;

import java.util.List;

import com.hexaware.automobile.insurancesystem.entities.Vehicle;
import com.hexaware.automobile.insurancesystem.exception.VehicleNotFoundException;

public interface IVehicleService {

	  Vehicle addVehicle(Vehicle vehicle);
	    Vehicle updateVehicle(Vehicle vehicle) throws VehicleNotFoundException;
	    Vehicle getVehicleById(int vehicleId) throws VehicleNotFoundException;
	    List<Vehicle> getAllVehicles();
	    String deleteVehicleById(int vehicleId);
}
