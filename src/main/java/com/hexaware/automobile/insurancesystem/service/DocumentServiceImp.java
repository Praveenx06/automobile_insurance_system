package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen    
 * Modified on : 31-Jul-2025
 * Description : Document service implementation calss 
 * */
import java.util.List;
import java.util.stream.Collectors;

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
	     ProposalRepository proposalRepository;

	    
	 @Override
	    public DocumentDto addDocument(DocumentDto dto) {
	        Proposal proposal = proposalRepository.findById(dto.getProposalId())
	                .orElseThrow(() -> new RuntimeException("Proposal not found with id: " + dto.getProposalId()));

	        Document document = new Document();
	        document.setDocId(dto.getDocId());
	        document.setDocType(dto.getDocType());
	        document.setProposal(proposal);

	        Document saved = repo.save(document);
	        return mapToDto(saved);
	    }

	    @Override
	    public DocumentDto getDocumentById(int docId) throws DocumentNotFoundException {
	        Document document = repo.findById(docId)
	                .orElseThrow(() -> new DocumentNotFoundException("Document not found with id: " + docId));
	        return mapToDto(document);
	    }

	    @Override
	    public List<DocumentDto> getAllDocuments() {
	        return repo.findAll()
	                .stream()
	                .map(this::mapToDto)
	                .collect(Collectors.toList());
	    }

	    @Override
	    public DocumentDto updateDocument(DocumentDto dto) throws DocumentNotFoundException {
	        Document document = repo.findById(dto.getDocId())
	                .orElseThrow(() -> new DocumentNotFoundException("Document not found with id: " + dto.getDocId()));

	        Proposal proposal = proposalRepository.findById(dto.getProposalId())
	                .orElseThrow(() -> new RuntimeException("Proposal not found with id: " + dto.getProposalId()));

	        document.setDocType(dto.getDocType());
	        document.setProposal(proposal);

	        Document updated = repo.save(document);
	        return mapToDto(updated);
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
	    public List<DocumentDto> getDocumentsByProposalId(int proposalId) {
	        List<Document> documents = repo.findByProposal_ProposalId(proposalId);
	        return documents.stream().map(this::mapToDto).collect(Collectors.toList());
	    }
	
	private DocumentDto mapToDto(Document document) {
        return new DocumentDto(
                document.getDocId(),
                document.getDocType(),
                document.getProposal().getProposalId()
        );
    }

}
