package com.hexaware.automobile.insurancesystem.service;

import java.util.List;

import com.hexaware.automobile.insurancesystem.entities.Addon;
import com.hexaware.automobile.insurancesystem.exception.AddonNotFoundException;

public interface IAddonService {
	
	public Addon addAddon(Addon addon); 

	public  Addon getAddonById(int addOnId) throws AddonNotFoundException; 

	public List<Addon> getAllAddons(); 

	public  Addon updateAddon(Addon addon) throws AddonNotFoundException; 

	public  String deleteAddonById(int addOnId) ; 
    
}
