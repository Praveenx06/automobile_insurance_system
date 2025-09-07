package com.hexaware.automobile.insurancesystem.dto;
/*
 * @Author : Praveen
 * Modified On : 01-Aug-2025
 * Description : Vehicle DTO with basic validation
 */
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
public class VehicleDto {
	

    @Min(value = 1)
    private int vehicleId;

    @NotEmpty(message = "Type cannot be empty")
    @Pattern(regexp = "^(CAR|BIKE|VAN|TRUCK)$",
    message = "type must be one of: CAR, BIKE, VAN, TRUCK")
    private String type;

    
    @NotBlank(message = "Model cannot be blank")
    private String model;

    @NotNull
    private Integer year;
    

}
