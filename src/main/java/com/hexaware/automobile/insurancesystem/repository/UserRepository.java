package com.hexaware.automobile.insurancesystem.repository;
/* Author : Praveen  
 * Modified on : 31-Jul-2025
 * Description : User Repository interface
 * */
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.automobile.insurancesystem.entities.User;
@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

}
