package com.hexaware.automobile.insurancesystem.service;

import java.util.List;

import com.hexaware.automobile.insurancesystem.dto.UserDto;
import com.hexaware.automobile.insurancesystem.entities.User;
import com.hexaware.automobile.insurancesystem.exception.UserNotFoundException;

public interface IUserService {
	

	public User addUser(UserDto dto) ;
	public User getById(int userId) throws UserNotFoundException;
	public List<User> getAllUser();
	public User updateAddon(User user) throws UserNotFoundException ;
	public String deleteUserById(int userId);

}
