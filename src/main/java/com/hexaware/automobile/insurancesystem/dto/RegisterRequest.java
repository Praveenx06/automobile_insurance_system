package com.hexaware.automobile.insurancesystem.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.NoArgsConstructor;

@NoArgsConstructor


public class RegisterRequest {
	 @NotBlank
	    private String email;

	    @NotBlank
	    private String password;

	   
	    private String roles;


		public String getEmail() {
			return email;
		}


		public void setEmail(String email) {
			this.email = email;
		}


		public String getPassword() {
			return password;
		}


		public void setPassword(String password) {
			this.password = password;
		}


		public String getRoles() {
			return roles;
		}


		public void setRoles(String roles) {
			this.roles = roles;
		}


		public RegisterRequest(@NotBlank String email, @NotBlank String password, String roles) {
			super();
			this.email = email;
			this.password = password;
			this.roles = roles;
		}


		@Override
		public String toString() {
			return "RegisterRequest [email=" + email + ", password=" + password + ", roles=" + roles + "]";
		}
	    
	    


}
