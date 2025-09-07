package com.hexaware.automobile.insurancesystem.entities;
/*
 * Author : Praveen  
 * Modified on : 25-Jul-2025 
 * Description : Vehicle entity with Orm 
 * 
 */
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="Vehicles")
public class Vehicle {
	@Id
    private int vehicleId;
    private String type; 
    private String model;
    private Integer year;

    @OneToOne(mappedBy = "vehicle", cascade = CascadeType.ALL)
    private Proposal proposal;
    
    public Vehicle() {}

	public Vehicle(int vehicleId, String type, String model, Integer year, Proposal proposal) {
		super();
		this.vehicleId = vehicleId;
		this.type = type;
		
		this.model = model;
		this.year = year;
		this.proposal = proposal;
	}

	public int getVehicleId() {
		return vehicleId;
	}

	public void setVehicleId(int vehicleId) {
		this.vehicleId = vehicleId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	
	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public Proposal getProposal() {
		return proposal;
	}

	public void setProposal(Proposal proposal) {
		this.proposal = proposal;
	}

	@Override
	public String toString() {
		return "Vehicle [vehicleId=" + vehicleId + ", type=" + type +  ", model=" + model
				+ ", year=" + year + ", proposal=" + proposal + "]";
	}

}
