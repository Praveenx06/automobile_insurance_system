package com.hexaware.automobile.insurancesystem.entities;
/*
 * Author : Praveen
 * Modified on : 24-Jul-2025
 * Description : Document Entity class with ORM mapping
 */

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@Entity
@Table(name = "documents")
public class Document {
	  @Id
	   
	    private int docId;
	    private String docType;
	    @ManyToOne
	    @JoinColumn(name = "proposal_id")
	    private Proposal proposal;

	   
	    

}
