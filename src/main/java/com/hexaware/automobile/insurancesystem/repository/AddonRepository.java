package com.hexaware.automobile.insurancesystem.repository;
/* Author : Praveen   
 * Modified on : 1-Aug-2025
 * Description : Addon Repository interface
 * */
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.automobile.insurancesystem.entities.Addon;
@Repository
public interface AddonRepository extends JpaRepository<Addon, Integer>{

	boolean existsByNameIgnoreCase(String name);
	

}
