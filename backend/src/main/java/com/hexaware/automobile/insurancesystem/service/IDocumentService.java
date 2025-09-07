package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen   
 * Modified on : 02-Aug-2025
 * Description :IDocumentService 
 * */
import java.util.List;

import com.hexaware.automobile.insurancesystem.dto.DocumentDto;
import com.hexaware.automobile.insurancesystem.entities.Document;


public interface IDocumentService {
	    public DocumentDto addDocument(DocumentDto dto);

	    public DocumentDto getDocumentById(int docId) ;

	    public List<DocumentDto> getAllDocuments();

	    public DocumentDto updateDocument(DocumentDto document) ;

	    public String deleteDocumentById(int docId);
	    
	   public  List<DocumentDto> getDocumentsByProposalId(int proposalId);

}
