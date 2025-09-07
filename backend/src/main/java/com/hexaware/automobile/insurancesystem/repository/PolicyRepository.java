package com.hexaware.automobile.insurancesystem.repository;
import java.util.List;

/* Author : Praveen   
 * Modified on : 1-Aug-2025
 * Description : Policy Repository interface
 * */
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.automobile.insurancesystem.entities.Policy;
import com.hexaware.automobile.insurancesystem.entities.Proposal;
@Repository
public interface PolicyRepository extends JpaRepository<Policy, Integer>{
	 
    List<Policy> findByStatus(String status);

	boolean existsByProposal(Proposal proposal);

	

    
	

}
