package com.hexaware.automobile.insurancesystem.service;

import java.util.List;

import com.hexaware.automobile.insurancesystem.entities.Document;
import com.hexaware.automobile.insurancesystem.exception.DocumentNotFoundException;

public interface IDocumentService {
	 public Document addDocument(Document document);

	    public Document getDocumentById(int docId) throws DocumentNotFoundException;

	    public List<Document> getAllDocuments();

	    public Document updateDocument(Document document) throws DocumentNotFoundException;

	    public String deleteDocumentById(int docId);

}
