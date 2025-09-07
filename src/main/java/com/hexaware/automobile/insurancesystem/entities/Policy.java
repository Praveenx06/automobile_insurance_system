package com.hexaware.automobile.insurancesystem.entities;
/*
 * Author : Praveen 
 * Modified on : 24-Jul-2025
 * Description : Policy Entity class with ORM mapping
 * 
 */
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@Entity
@Table(name="policies")
public class Policy {
	

	 @Id
	    private int policyId;
	    @OneToOne
	    @JoinColumn(name = "proposal_id")
	    private Proposal proposal;
	    private LocalDate startDate;
	    private LocalDate endDate;
	    private String status;  
	    private String description;
	    private double price;
	    @OneToMany(mappedBy = "policy", cascade = CascadeType.ALL,orphanRemoval = true)
	    private List<Claim> claims;

}
