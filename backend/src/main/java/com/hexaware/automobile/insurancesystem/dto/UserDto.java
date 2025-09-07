package com.hexaware.automobile.insurancesystem.dto;
/*
 * @Author : Praveen
 * Modified On : 01-Aug-2025
 * Description : User DTO with basic validation
 */
import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
public class UserDto {
	

    @Min(value = 1)
    private int userId;

    @NotEmpty
    private String name;

    @NotBlank
    private String address;

    @Email
    private String email;

    @NotBlank(message="Password should not be blank")
    @Size(min = 6)
    private String password;

    @Past(message = "Date of birth must be present or future") 
    private LocalDate dateOfBirth;

    @NotNull
    private int age;

    @Pattern(regexp = "\\d{16}", message = "Aadhaar must be exactly 16 digits")
    private String aadhaarNumber;

    @Pattern(regexp = "[A-Z]{5}[0-9]{4}[A-Z]")
    private String panNumber;
    
    @Pattern(regexp = "^(USER|ADMIN)$",
    	    message = "Role must be one of: USER, ADMIN")
    private String roles;
    

}
