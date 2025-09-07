package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen   
 * Modified on : 02-Aug-2025
 * Description :IUserService 
 * */
import java.util.List;
import java.util.Optional;

import com.hexaware.automobile.insurancesystem.dto.UserDto;
import com.hexaware.automobile.insurancesystem.entities.User;


public interface IUserService {
	

	public User addUser(UserDto dto) ;
	public User getById(int userId) ;
	public List<UserDto> getAllUser();
	public User updateAddon(User user)  ;
	public String deleteUserById(int userId);
	public List<User> getUsersByAadhaar(String aadhaarNumber);
	public Optional<User> getByUsername(String name);
	
	User getUserByEmail(String email);

}
