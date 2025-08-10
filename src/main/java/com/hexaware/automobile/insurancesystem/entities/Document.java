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

@Entity
@Table(name = "documents")
public class Document {
	  @Id
	   
	    private int docId;
	    private String docType;
	    @ManyToOne
	    @JoinColumn(name = "proposal_id")
	    private Proposal proposal;

	    public Document() {}
	    	
		public Document(int docId, String docType, com.hexaware.automobile.insurancesystem.entities.Proposal proposal) {
			super();
			this.docId = docId;
			this.docType = docType;
			this.proposal = proposal;
		}

		public int getDocId() {
			return docId;
		}

		public void setDocId(int docId) {
			this.docId = docId;
		}

		public String getDocType() {
			return docType;
		}

		public void setDocType(String docType) {
			this.docType = docType;
		}

		public Proposal getProposal() {
			return proposal;
		}

		public void setProposal(Proposal proposal) {
			this.proposal = proposal;
		}

		@Override
		public String toString() {
			return "Document [docId=" + docId + ", docType=" + docType + ", proposal=" + proposal + "]";
		}
	    
	    

}
