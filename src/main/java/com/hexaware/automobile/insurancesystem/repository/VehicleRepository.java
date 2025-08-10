package com.hexaware.automobile.insurancesystem.repository;
/* Author : Praveen  
 * Modified on : 1-Aug-2025
 * Description : Vehicle Repository interface
 * */
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.automobile.insurancesystem.entities.Vehicle;
@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer>{

}
