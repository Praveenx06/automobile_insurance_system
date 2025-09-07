package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen   
 * Modified on : 01-Aug-2025
 * Description :IAddonService 
 * */
import java.util.List;

import com.hexaware.automobile.insurancesystem.dto.AddonDto;
import com.hexaware.automobile.insurancesystem.entities.Addon;


public interface IAddonService {
	
	public Addon addAddon(AddonDto dto); 

	public  Addon getAddonById(int addOnId); 

	public List<Addon> getAllAddons(); 

	public  Addon updateAddon(Addon addon) ;

	public  String deleteAddonById(int addOnId) ; 
    
}
