package com.hexaware.automobile.insurancesystem.entities;
/*
 * Author : Praveen 
 * Modified on : 25-Jul-2025
 * Description : Proposal Entity with orm
 * 
 */
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@Entity
@Table(name = "proposals")
public class Proposal {
	@Id
    private int proposalId;

	@ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;
    
    private String status;  

    @OneToOne(mappedBy = "proposal", cascade = CascadeType.ALL,orphanRemoval = true)
    private Quote quote;

    @OneToMany(mappedBy = "proposal", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Document> documents;

    @OneToOne(mappedBy = "proposal", cascade = CascadeType.ALL,orphanRemoval = true)
    private Policy policy;
    
    @ManyToMany
    @JoinTable(
        name = "proposal_addons",
        joinColumns = @JoinColumn(name = "proposal_id"),
        inverseJoinColumns = @JoinColumn(name = "addon_id")
    )
    private List<Addon> addOns;

	
	
}
