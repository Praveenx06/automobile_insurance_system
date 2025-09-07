package com.hexaware.automobile.insurancesystem.restcontroller;
/* Author : Praveen    
 * Modified on : 1-Aug-2025
 * Description : Addon restcontroller with endpoints
 * */
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.hexaware.automobile.insurancesystem.dto.AddonDto;
import com.hexaware.automobile.insurancesystem.entities.Addon;
import com.hexaware.automobile.insurancesystem.service.IAddonService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
@CrossOrigin(origins ="http://localhost:5173/")
@RestController
@Slf4j
@RequestMapping("/api/addons")
public class AddonRestController {

	@Autowired
	IAddonService service;
	 @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	@PostMapping("/add")
    public Addon addAddon(@Valid @RequestBody AddonDto dto) {
        log.debug("New Addon record being added: {}", dto);
        return service.addAddon(dto);
    }

	 @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping("/update")
    public Addon updateAddon(@Valid @RequestBody Addon addon) {
        log.info("Updating Addon record with ID: {} ",addon.getAddOnId());
        return service.updateAddon(addon);
    }
    
	 @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/getById/{addOnId}")
    public Addon getAddonById(@PathVariable int addOnId)  {
        log.info("Retrieving Addon record with ID: {} ", addOnId);
        return service.getAddonById(addOnId);
    }
    
	 @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/getAll")
    public List<Addon> getAllAddons() {
        log.debug("Retrieving all Addon records");
        return service.getAllAddons();
    }

	 @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/deleteById/{addOnId}")
    public String deleteAddonById( @PathVariable int addOnId) {
        log.info("Deleting Addon record with ID: {} ", addOnId);
        return service.deleteAddonById(addOnId);
}
}
