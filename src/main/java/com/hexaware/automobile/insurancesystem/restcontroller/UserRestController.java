package com.hexaware.automobile.insurancesystem.restcontroller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.automobile.insurancesystem.dto.UserDto;
import com.hexaware.automobile.insurancesystem.entities.User;
//import com.hexaware.automobile.insurancesystem.exception.UserNotFoundException;
import com.hexaware.automobile.insurancesystem.service.IUserService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api/users")
public class UserRestController {
	@Autowired
	IUserService service;
	
	 @PostMapping("/add")
	    public User addUser(@Valid @RequestBody UserDto dto) {
	        log.info("Adding new user ");
	        return service.addUser(dto);
	    }
	 
	 @PreAuthorize("hasAuthority('ADMIN','USER')")
	 @GetMapping("/{userId}")
	    public User getById(@PathVariable int userId) {
	        log.info("Fetching user with ID {}", userId);
	        return service.getById(userId); 
	    }
	 
	
	 @PreAuthorize("hasAuthority('ADMIN')")
	 @GetMapping
	    public List<User> getAllUsers() {
	        log.info("Fetching all users");
	        return service.getAllUser();
	    }
	 
	 
	 @PreAuthorize("hasAuthority('ADMIN')")
	 @PutMapping("/update")
	    public User updateUser(@Valid @RequestBody User user) {
	        log.info("Updating user with ID {} ");
	        return service.updateAddon(user);
	    }
	 
	 
	 @PreAuthorize("hasAuthority('ADMIN')")
	 @DeleteMapping("/{userId}")
	    public String deleteUser(@PathVariable int userId) {
	        log.info("Deleting user with ID {}", userId);
	        return service.deleteUserById(userId);
	    }
	 
	 @GetMapping("/aadhaar/{aadhaarNumber}")
	 public List<User> getByAadhaar(@PathVariable String aadhaarNumber) {
	     log.info("Fetching users with Aadhaar number {}", aadhaarNumber);
	     return service.getUsersByAadhaar(aadhaarNumber);
	 }
	 
	 @GetMapping("/findbyUsername/{name}")
	 public ResponseEntity<User> getByUsername(@PathVariable String name) {
	     log.info("Fetching users with username {}", name);
	     Optional<User> userOpt = service.getByUsername(name);
	     if (userOpt.isPresent()) {
	         return ResponseEntity.ok(userOpt.get());
	     } else {
	         return ResponseEntity.notFound().build();
	     }

	 
	 
}
	 }
