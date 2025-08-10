package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen   
 * Modified on : 31-Jul-2025
 * Description : Document service implementation calss with autowired documentrepository
 * */
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.automobile.insurancesystem.entities.Document;
import com.hexaware.automobile.insurancesystem.exception.DocumentNotFoundException;
import com.hexaware.automobile.insurancesystem.repository.DocumentRepository;
@Service
public class DocumentServiceImp implements IDocumentService{

	@Autowired
	DocumentRepository repo;
	
	@Override
	public Document addDocument(Document document) {
		
		return repo.save(document);
	}

	@Override
	public Document getDocumentById(int docId) throws DocumentNotFoundException {
		
		return repo.findById(docId).orElseThrow(() -> new DocumentNotFoundException("Document id "+ docId + " not found")) ;
	}

	@Override
	public List<Document> getAllDocuments() {
		
		return repo.findAll();
	}

	@Override
	public Document updateDocument(Document document) throws DocumentNotFoundException {
		if(!repo.existsById(document.getDocId())) {
			throw new DocumentNotFoundException ("Cannot update document ");
		}
		return repo.save(document);
	}

	@Override
	public String deleteDocumentById(int docId) {
		repo.deleteById(docId);
		
		return "Recoed deleted successfully";
	}

}
