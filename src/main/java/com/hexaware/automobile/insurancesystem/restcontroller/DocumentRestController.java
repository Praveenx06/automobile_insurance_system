package com.hexaware.automobile.insurancesystem.restcontroller;
/* Author : Praveen   
 * Modified on : 1-Aug-2025
 * Description : Document restcontroller with endpoints
 * */
import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.automobile.insurancesystem.dto.DocumentDto;
import com.hexaware.automobile.insurancesystem.entities.Document;
import com.hexaware.automobile.insurancesystem.service.IDocumentService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api/documents")
public class DocumentRestController {
	@Autowired
    private IDocumentService service;
	
    @PostMapping("/add")
    public Document addDocument(@RequestBody DocumentDto dto) {
        log.debug("Adding new document ", dto);
        return service.addDocument(dto);
    }

    @PostMapping("/update")
    public Document updateDocument(@RequestBody Document document)  {
        log.info("Updating document with ID ", document.getDocId());
        return service.updateDocument(document);
    }
    
    @GetMapping("/getById/{docId}")
    public Document getDocumentById(@PathVariable int docId)  {
        log.info("Retrieving document with ID: {}", docId);
        return service.getDocumentById(docId);
    }
    
    @GetMapping("/getAll")
    public List<Document> getAllDocuments() {
        log.debug("Retrieving all documents");
        return service.getAllDocuments();
    }

    @DeleteMapping("/deleteById/{docId}")
    public String deleteDocumentById(@PathVariable int docId) {
        log.info("Deleting document with ID ", docId);
        return service.deleteDocumentById(docId);
    }
    
    @GetMapping("/proposal/{proposalId}")
    public List<Document> getDocumentsByProposalId(@PathVariable int proposalId) {
    	
        return service.getDocumentsByProposalId(proposalId);
    }
}
