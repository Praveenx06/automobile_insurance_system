package com.hexaware.automobile.insurancesystem.service;

import java.util.List; 

import com.hexaware.automobile.insurancesystem.dto.UserDto;
import com.hexaware.automobile.insurancesystem.entities.User;


public interface IUserService {
	

	public User addUser(UserDto dto) ;
	public User getById(int userId) ;
	public List<User> getAllUser();
	public User updateAddon(User user)  ;
	public String deleteUserById(int userId);
	public List<User> getUsersByAadhaar(String aadhaarNumber);

}
