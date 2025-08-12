package com.hexaware.automobile.insurancesystem.service;

import java.util.List;

import com.hexaware.automobile.insurancesystem.dto.DocumentDto;
import com.hexaware.automobile.insurancesystem.entities.Document;


public interface IDocumentService {
	    public Document addDocument(DocumentDto dto);

	    public Document getDocumentById(int docId) ;

	    public List<Document> getAllDocuments();

	    public Document updateDocument(Document document) ;

	    public String deleteDocumentById(int docId);
	    
	   public  List<Document> getDocumentsByProposalId(int proposalId);

}
