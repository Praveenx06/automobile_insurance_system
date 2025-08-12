package com.hexaware.automobile.insurancesystem.dto;
/*
 * @Author : Praveen
 * Modified On : 31-Jul-2025
 * Description : Quote DTO with basic validation
 */
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class QuoteDto {
	
	    @Min(value = 1)
	    private int quoteId;

	    @NotNull(message="Amount cannot be null")
	    private Double premiumAmount;

	    @Min(value = 1,message="Id cannot be null")
	    private int proposalId;
	    
	    public QuoteDto() {}

		public QuoteDto( int quoteId,  Double premiumAmount, int proposalId) {
			super();
			this.quoteId = quoteId;
			this.premiumAmount = premiumAmount;
			this.proposalId = proposalId;
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

		public int getProposalId() {
			return proposalId;
		}

		public void setProposalId(int proposalId) {
			this.proposalId = proposalId;
		}

		@Override
		public String toString() {
			return "QuoteDto [quoteId=" + quoteId + ", premiumAmount=" + premiumAmount + ", proposalId=" + proposalId
					+ "]";
		} 
	    
	    

}
