package com.hexaware.automobile.insurancesystem.repository;
/* Author : Praveen   
 * Modified on : 1-Aug-2025
 * Description : Claim Repository interface
 * */
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.automobile.insurancesystem.entities.Claim;
@Repository
public interface ClaimRepository extends JpaRepository<Claim, Integer>{

}
