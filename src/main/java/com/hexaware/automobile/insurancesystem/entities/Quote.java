package com.hexaware.automobile.insurancesystem.entities;
/*
 * Author : Praveen 
 * Modified on : 25-Jul-2025
 * Description : Quote entity with orm
 * 
 */
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "quotes")
public class Quote {
	@Id
	 private int quoteId;
	private Double premiumAmount;
	@OneToOne
    @JoinColumn(name = "proposal_id")
    private Proposal proposal;
	
	public Quote() {}
	public Quote(int quoteId, Double premiumAmount, Proposal proposal) {
		super();
		this.quoteId = quoteId;
		this.premiumAmount = premiumAmount;
		this.proposal = proposal;
	}
	public int getQuoteId() {
		return quoteId;
	}
	public void setQuoteId(int quoteId) {
		this.quoteId = quoteId;
	}
	public Double getPremiumAmount() {
		return premiumAmount;
	}
	public void setPremiumAmount(Double premiumAmount) {
		this.premiumAmount = premiumAmount;
	}
	public Proposal getProposal() {
		return proposal;
	}
	public void setProposal(Proposal proposal) {
		this.proposal = proposal;
	}
	@Override
	public String toString() {
		return "Quote [quoteId=" + quoteId + ", premiumAmount=" + premiumAmount + ", proposal=" + proposal + "]";
	}
	
	
	

	
}