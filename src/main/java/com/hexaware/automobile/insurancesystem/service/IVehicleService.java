package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen   
 * Modified on : 02-Aug-2025
 * Description :IVehicleService 
 * */
import java.util.List;

import com.hexaware.automobile.insurancesystem.dto.VehicleDto;
import com.hexaware.automobile.insurancesystem.entities.Vehicle;


public interface IVehicleService {

	    public Vehicle addVehicle(VehicleDto dto);
	    public Vehicle updateVehicle(Vehicle vehicle);
	    public VehicleDto getVehicleById(int vehicleId) ;
	    List<VehicleDto> getAllVehicles();
	    public String deleteVehicleById(int vehicleId);
	    List<VehicleDto> getVehiclesByType(String type);
}
