package com.hexaware.automobile.insurancesystem.dto;
/*
 * @Author : Praveen
 * Modified On : 29-Jul-2025
 * Description : Claim DTO with basic validation
 */
import java.time.LocalDate;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class ClaimDto {
	

    private int claimId;

    @PastOrPresent(message = "Claim date cannot be in the past")
    private LocalDate claimDate;

    @NotBlank
    private String claimReason;

    @Pattern(regexp = "Pending|Approved|Rejected", message = "Status must be Pending, Approved, or Rejected")
    private String status;
    @Min(value=0)
    private int policyId;
    
    

}
