package com.hexaware.automobile.insurancesystem.dto;
/*
 * @Author : Praveen
 * Modified On : 31-Jul-2025
 * Description : Proposal DTO with basic validation
 */
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
public class ProposalDto {


    @Min(value = 1)
    private int proposalId;

    @Min(value = 1)
    private int userId; 

    @Min(value = 1)
    private int vehicleId; 
    
    @NotBlank
    private String status;
}
