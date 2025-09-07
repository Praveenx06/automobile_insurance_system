package com.hexaware.automobile.insurancesystem.dto;
/*
 * @Author : Praveen 
 * Modified On : 29-Jul-2025
 * Description : Addon DTO with basic validation
 */
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
public class AddonDto {
	

    private int addOnId; 
    @NotBlank(message="Name should not be null")
    private String name;

    @NotNull
    @Min(value = 0)
    private Double additionalCost;

}
