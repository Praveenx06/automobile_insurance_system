package com.hexaware.automobile.insurancesystem.dto;
/*
 * @Author : Praveen
 * Modified On : 29-Jul-2025
 * Description : Claim DTO with basic validation
 */
import java.time.LocalDate;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class ClaimDto {
  

	@NotNull(message = "claimId is required for update")
    @Min(value = 1, message = "claimId must be a positive integer")
    private int claimId;

    @NotNull(message = "claimDate is required")
    @PastOrPresent(message = "Claim date cannot be in the future")
    private LocalDate claimDate;

    @NotBlank(message = "claimReason is required")
    @Size(min = 10, max = 500, message = "claimReason must be between 10 and 500 characters")
    private String claimReason;

    @NotBlank(message = "status is required")
    @Pattern(regexp = "^(PENDING|APPROVED|REJECTED|UNDER_REVIEW|CLOSED)$",
             message = "status must be one of: PENDING, APPROVED, REJECTED, UNDER_REVIEW, CLOSED")
    private String status;

    @NotNull(message = "policyId is required")
    @Min(value = 0, message = "policyId must be a positive integer")
    private int policyId;
}
