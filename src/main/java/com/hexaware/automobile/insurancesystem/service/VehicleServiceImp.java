package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen    
 * Modified on : 01-Aug-2025
 * Description : Vehicle service implementation calss 
 * */
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.automobile.insurancesystem.dto.VehicleDto;
import com.hexaware.automobile.insurancesystem.entities.Vehicle;
import com.hexaware.automobile.insurancesystem.exception.VehicleNotFoundException;
import com.hexaware.automobile.insurancesystem.repository.VehicleRepository;
@Service
public class VehicleServiceImp implements IVehicleService {
	@Autowired
	VehicleRepository repo;
	private VehicleDto convertToDto(Vehicle v) {
        VehicleDto dto = new VehicleDto();
        dto.setVehicleId(v.getVehicleId());
        dto.setType(v.getType());
        dto.setModel(v.getModel());
        dto.setYear(v.getYear());
        return dto;
    }
	
	@Override
	public Vehicle addVehicle(VehicleDto dto) {
	
		Vehicle vehicle = new Vehicle();
		vehicle.setVehicleId(dto.getVehicleId());
        vehicle.setType(dto.getType());
        vehicle.setModel(dto.getModel());
        vehicle.setYear(dto.getYear());
        return repo.save(vehicle);
	}

	@Override
	public Vehicle updateVehicle(Vehicle vehicle) throws VehicleNotFoundException {
		if (!repo.existsById(vehicle.getVehicleId())) {
            throw new VehicleNotFoundException("Cannot update vehicle ");
        }
        return repo.save(vehicle);
		
	}

	  @Override
	    public VehicleDto getVehicleById(int vehicleId) throws VehicleNotFoundException {
	        Vehicle v = repo.findById(vehicleId)
	                .orElseThrow(() -> new VehicleNotFoundException("Vehicle ID " + vehicleId + " not found"));
	        return convertToDto(v);
	    }

	
	@Override
	public String deleteVehicleById(int vehicleId) {
		repo.deleteById(vehicleId);
		return "Vehicle deleted successfully";
	}
	
	 @Override
	    public List<VehicleDto> getVehiclesByType(String type) {
	        return repo.findByType(type).stream()
	                .map(this::convertToDto)
	                .collect(Collectors.toList());
	    }
	 @Override
	    public List<VehicleDto> getAllVehicles() {
	        return repo.findAll().stream()
	                .map(this::convertToDto)
	                .collect(Collectors.toList());
	    }

}
