package com.hexaware.automobile.insurancesystem.dto;
/*
 * @Author : Praveen
 * Modified On : 29-Jul-2025
 * Description : Document DTO with basic validation
 */
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DocumentDto {
	 @Min(value = 1)
	    private int docId;

	    @NotBlank(message="Enter document type")
	    private String docType;

	    @Min(value = 1)
	    private int proposalId;

	    
	    public DocumentDto(int docId, String docType, int proposalId) {
	        this.docId = docId;
	        this.docType = docType;
	        this.proposalId = proposalId;
	    }
}
