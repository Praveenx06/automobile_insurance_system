package com.hexaware.automobile.insurancesystem.dto;
/*
 * @Author : Praveen
 * Modified On : 31-Jul-2025
 * Description : Policy DTO with basic validation
 */
import java.time.LocalDate; 

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PolicyDto {

    @Min(value = 1)
    private int policyId;

   
    private int proposalId; 

    @FutureOrPresent(message = "Start date cannot be in the past")
    private LocalDate startDate;

    @FutureOrPresent(message = "End date cannot be in the past")
    private LocalDate endDate;

   
    @NotBlank(message = "status is required")
    @Pattern(regexp = "^(ACTIVE|EXPIRED|UNDER REVIEW)$",
             message = "status must be one of:ACTIVE ,EXPIRED,UNDER REVIEW ")
    private String status;
    
    private String description;
    
    @Min(value = 0, message = "Price must be non-negative")
    private double price;

}
