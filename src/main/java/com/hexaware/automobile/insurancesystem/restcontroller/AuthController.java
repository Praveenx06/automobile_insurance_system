package com.hexaware.automobile.insurancesystem.restcontroller;
/*
 * Author : Praveen  
 * Modified on : 13-Aug-2025 
 * Description : AuthController
 * 
 */
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.automobile.insurancesystem.dto.AuthRequest;
import com.hexaware.automobile.insurancesystem.dto.AuthResponse;
import com.hexaware.automobile.insurancesystem.entities.User;
import com.hexaware.automobile.insurancesystem.repository.UserRepository;
import com.hexaware.automobile.insurancesystem.security.JwtService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository; 
    private final PasswordEncoder passwordEncoder;
    private final UserDetailsService userDetailsService;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "User registered successfully";
    }

    @PostMapping("/login")	
    public AuthResponse login(@RequestBody AuthRequest authRequest) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );

        UserDetails ud = userDetailsService.loadUserByUsername(authRequest.getUsername());
        String token = jwtService.generateToken(ud);
        return new AuthResponse(token);
    }
}
