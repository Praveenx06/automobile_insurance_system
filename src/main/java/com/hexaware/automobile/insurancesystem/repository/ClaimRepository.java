package com.hexaware.automobile.insurancesystem.repository;


import java.util.List;

/* Author : Praveen   
 * Modified on : 1-Aug-2025
 * Description : Claim Repository interface
 * */
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hexaware.automobile.insurancesystem.entities.Claim;
@Repository
public interface ClaimRepository extends JpaRepository<Claim, Integer>{
	
	// Custom JPQL - find claims between dates
    @Query("SELECT c FROM Claim c WHERE c.claimDate BETWEEN :startDate AND :endDate")
    List<Claim> findClaimsBetweenDates(java.time.LocalDate startDate, java.time.LocalDate endDate);
	    
}
