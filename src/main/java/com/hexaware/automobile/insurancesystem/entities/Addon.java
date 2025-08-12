package com.hexaware.automobile.insurancesystem.entities;
/* Author : Praveen  
 * Modified on : 24-Jul-2025
 * Description : Addon Entity class with ORM mapping
 * */

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="addons")
public class Addon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int addOnId;

    private String name;
    private Double additionalCost;

    @ManyToMany(mappedBy = "addOns")
    private List<Proposal> proposals;
    
    public Addon() {}

	public Addon(int addOnId, String name, Double additionalCost, List<Proposal> proposals) {
		super();
		this.addOnId = addOnId;
		this.name = name;
		this.additionalCost = additionalCost;
		this.proposals = proposals;
	}

	public int getAddOnId() {
		return addOnId;
	}

	public void setAddOnId(int addOnId) {
		this.addOnId = addOnId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getAdditionalCost() {
		return additionalCost;
	}

	public void setAdditionalCost(Double additionalCost) {
		this.additionalCost = additionalCost;
	}

	public List<Proposal> getProposals() {
		return proposals;
	}

	public void setProposals(List<Proposal> proposals) {
		this.proposals = proposals;
	}

	@Override
	public String toString() {
		return "Addon [addOnId=" + addOnId + ", name=" + name + ", additionalCost=" + additionalCost + ", proposals="
				+ proposals + "]";
	}
    
}
