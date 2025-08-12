package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen   
 * Modified on : 31-Jul-2025
 * Description : Document service implementation calss with autowired documentrepository
 * */
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.automobile.insurancesystem.dto.DocumentDto;
import com.hexaware.automobile.insurancesystem.entities.Document;
import com.hexaware.automobile.insurancesystem.entities.Proposal;
import com.hexaware.automobile.insurancesystem.exception.ClaimNotFoundException;
import com.hexaware.automobile.insurancesystem.exception.DocumentNotFoundException;
import com.hexaware.automobile.insurancesystem.repository.DocumentRepository;
import com.hexaware.automobile.insurancesystem.repository.ProposalRepository;
@Service
public class DocumentServiceImp implements IDocumentService{

	@Autowired
	DocumentRepository repo;
	@Autowired
	  ProposalRepository repo1;
	
	@Override
	public Document addDocument(DocumentDto dto) {
		Document document = new Document();
        document.setDocId(dto.getDocId());
        document.setDocType(dto.getDocType());

        Proposal proposal = repo1.findById(dto.getProposalId())
                .orElseThrow(() -> new RuntimeException("Proposal not found"));
        document.setProposal(proposal);

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
		if (!repo.existsById(docId)) {
            throw new ClaimNotFoundException("Cannot delete - claim not found");
        }
        repo.deleteById(docId);
        return "Record deleted successfully";

	}

	@Override
	public List<Document> getDocumentsByProposalId(int proposalId) {
		 return repo.findByProposal_ProposalId(proposalId);
	}

}
