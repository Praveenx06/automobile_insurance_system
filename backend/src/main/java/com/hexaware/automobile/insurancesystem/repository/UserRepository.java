package com.hexaware.automobile.insurancesystem.repository;
import java.util.List; 
import java.util.Optional;

/* Author : Praveen  
 * Modified on : 31-Jul-2025
 * Description : User Repository interface
 * */
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.hexaware.automobile.insurancesystem.entities.User;
@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	  List<User> findByAadhaarNumber(String aadhaarNumber);

	  Optional<User> findByName(String name);
	  Optional<User> findByEmail(String email);
	  

}
