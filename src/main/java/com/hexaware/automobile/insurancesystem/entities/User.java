package com.hexaware.automobile.insurancesystem.entities;
/*
 * Author : Praveen 
 * Modified on : 25-Jul-2025
 * Description : User entity with orm mapping
 * 
 */
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Past;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@NoArgsConstructor
@Table(name="Users")
public class User {
	@Id
	 private int userId;

	    private String name;
	    private String address;
	    private String email;
	    private String password;
	    
	    private LocalDate dateOfBirth;
	    private int age; 
	    private String aadhaarNumber;
	    private String panNumber;
	    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	    private List<Proposal> proposals;
	    private String roles;

}
