package com.hexaware.automobile.insurancesystem.repository;
import java.util.List;

/* Author : Praveen  
 * Modified on : 31-Jul-2025
 * Description : Proposal Repository interface
 * */
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.automobile.insurancesystem.entities.Proposal;
@Repository
public interface ProposalRepository extends JpaRepository<Proposal, Integer>{
	
	List<Proposal> findByUser_UserId(int userId);
}
