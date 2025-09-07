package com.hexaware.automobile.insurancesystem.restcontroller;
/* Author : Praveen    
 * Modified on : 1-Aug-2025
 * Description : Document restcontroller with endpoints
 * */
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.automobile.insurancesystem.dto.DocumentDto;
import com.hexaware.automobile.insurancesystem.entities.Document;
import com.hexaware.automobile.insurancesystem.service.IDocumentService;

import lombok.extern.slf4j.Slf4j;
@CrossOrigin(origins ="http://localhost:5173/")
@RestController
@Slf4j
@RequestMapping("/api/documents")
public class DocumentRestController {
	@Autowired
    private IDocumentService service;
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/add")
    public DocumentDto addDocument(@RequestBody DocumentDto dto) {
        log.debug("Adding new document ", dto);
        return service.addDocument(dto);
    }
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PutMapping("/update")
    public DocumentDto updateDocument(@RequestBody DocumentDto document)  {
        log.info("Updating document with ID ", document.getDocId());
        return service.updateDocument(document);
    }
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/getById/{docId}")
    public DocumentDto getDocumentById(@PathVariable int docId)  {
        log.info("Retrieving document with ID: {}", docId);
        return service.getDocumentById(docId);
    }
    
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/getAll")
    public List<DocumentDto> getAllDocuments() {
        log.debug("Retrieving all documents");
        return service.getAllDocuments();
    }
	@PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/deleteById/{docId}")
    public String deleteDocumentById(@PathVariable int docId) {
        log.info("Deleting document with ID ", docId);
        return service.deleteDocumentById(docId);
    }
    
	@PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/proposal/{proposalId}")
    public List<DocumentDto> getDocumentsByProposalId(@PathVariable int proposalId) {
    	
        return service.getDocumentsByProposalId(proposalId);
    }
}
