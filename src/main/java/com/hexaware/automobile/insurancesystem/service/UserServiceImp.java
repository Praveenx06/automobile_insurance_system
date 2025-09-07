package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen    
 * Modified on : 02-Aug-2025
 * Description : User service implementation calss 
 * */
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hexaware.automobile.insurancesystem.dto.UserDto;
import com.hexaware.automobile.insurancesystem.entities.User;
import com.hexaware.automobile.insurancesystem.exception.ResourceNotFoundException;
import com.hexaware.automobile.insurancesystem.exception.UserNotFoundException;
import com.hexaware.automobile.insurancesystem.repository.UserRepository;

@Service
public class UserServiceImp implements IUserService {
	@Autowired
	UserRepository repo;
	
	@Autowired
	PasswordEncoder encoder;

	@Override
	public User addUser(UserDto dto) {
		User user = new User();
		user.setUserId(dto.getUserId());
		user.setAadhaarNumber(dto.getAadhaarNumber());
		user.setAddress(dto.getAddress());
		user.setAge(dto.getAge());
		user.setDateOfBirth(dto.getDateOfBirth());
		user.setEmail(dto.getEmail());
		user.setName(dto.getName());
		user.setPanNumber(dto.getPanNumber());
		user.setPassword(encoder.encode(dto.getPassword()));
		user.setRoles(dto.getRoles());
		return repo.save(user);
	}

	@Override
	public User getById(int userId) throws UserNotFoundException {
		
		return repo.findById(userId).orElseThrow(()-> new UserNotFoundException ("userId "+userId+" not found") );
	}

	@Override
	public List<UserDto> getAllUser() {
		 List<User> users = repo.findAll();

		    return users.stream()
		            .map(u -> {
		                UserDto dto = new UserDto();
		                dto.setUserId(u.getUserId());
		                dto.setName(u.getName());
		                dto.setAddress(u.getAddress());
		                dto.setEmail(u.getEmail());
		                dto.setDateOfBirth(u.getDateOfBirth());
		                dto.setAge(u.getAge());
		                dto.setAadhaarNumber(u.getAadhaarNumber());
		                dto.setPanNumber(u.getPanNumber());
		                dto.setRoles(u.getRoles()); 
		               
		                return dto;
		            })
		            .toList();
		
		
	}

	@Override
	public User updateAddon(User user) throws UserNotFoundException {
		if(!repo.existsById(user.getUserId())) {
			throw new UserNotFoundException ("cannot update user");
		}
		return repo.save(user);
	}

	@Override
	public String deleteUserById(int userId) {
		if (!repo.existsById(userId)) {
		    throw new UserNotFoundException("User with ID " + userId + " not found");
		}
		repo.deleteById(userId);
		return "Record deleted successfully";
	}
	
	@Override
	public List<User> getUsersByAadhaar(String aadhaarNumber) {
	    return repo.findByAadhaarNumber(aadhaarNumber);
	}

	@Override
	public Optional<User> getByUsername(String name) throws UsernameNotFoundException{
		return Optional.empty();
	
	}
	 @Override
	    public User getUserByEmail(String email) {
	        
	        return repo.findByEmail(email)
	                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
	    }

	

	}

