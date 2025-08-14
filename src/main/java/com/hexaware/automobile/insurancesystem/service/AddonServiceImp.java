package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen    
 * Modified on : 1-Aug-2025
 * Description :  Addon service implementation calss 
 * */
import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.automobile.insurancesystem.dto.AddonDto;
import com.hexaware.automobile.insurancesystem.entities.Addon;
import com.hexaware.automobile.insurancesystem.exception.AddonAlreadyExistsException;
import com.hexaware.automobile.insurancesystem.exception.AddonNotFoundException;
import com.hexaware.automobile.insurancesystem.repository.AddonRepository;
@Service
public class AddonServiceImp implements IAddonService{

	@Autowired
	AddonRepository repo;
	
	@Override
	public Addon addAddon(AddonDto dto) {
		 if (repo.existsByNameIgnoreCase(dto.getName())) {
	            throw new AddonAlreadyExistsException("Addon with name '" + dto.getName() + "' already exists");
	        }

	        Addon addon = new Addon();
	        addon.setName(dto.getName());
	        addon.setAdditionalCost(dto.getAdditionalCost());
	       

	        return repo.save(addon);
	}

	@Override
	public Addon getAddonById(int addOnId) throws AddonNotFoundException {
		
		return repo.findById(addOnId).orElseThrow(() -> new AddonNotFoundException("Addon id " + addOnId + " not found"));
		// retun repo.findById(id).orElse(null);
		}

	@Override
	public List<Addon> getAllAddons() {
		
		return repo.findAll();
	}

	@Override
	public Addon updateAddon(Addon addon) throws AddonNotFoundException {
		
		  if (!repo.existsById(addon.getAddOnId())) {
            throw new AddonNotFoundException("Cannot update");
        }
        return repo.save(addon);
	}

	@Override
	public String deleteAddonById(int addOnId)  {
		repo.deleteById(addOnId);
		return "Record deleted successfully";
			
	}

	

}
