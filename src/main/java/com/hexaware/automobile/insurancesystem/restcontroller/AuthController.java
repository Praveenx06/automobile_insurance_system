package com.hexaware.automobile.insurancesystem.restcontroller;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.hexaware.automobile.insurancesystem.dto.AuthRequest;
import com.hexaware.automobile.insurancesystem.dto.AuthResponse;
import com.hexaware.automobile.insurancesystem.dto.UserDto;
import com.hexaware.automobile.insurancesystem.entities.User;
import com.hexaware.automobile.insurancesystem.repository.UserRepository;
import com.hexaware.automobile.insurancesystem.security.JwtService;
import com.hexaware.automobile.insurancesystem.security.UserInfoUserDetailsServiceImp;
import com.hexaware.automobile.insurancesystem.service.IUserService;
import com.hexaware.automobile.insurancesystem.service.UserServiceImp;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserInfoUserDetailsServiceImp userDetailsService;

    @Autowired
    private IUserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDto user) {
        if(userRepository.findByName(user.getName()).isPresent()){
            return ResponseEntity.badRequest().body("Username already taken");
        }
        userService.addUser(user); // hashes password inside
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body(new AuthResponse("Invalid credentials"));
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        String role = userRepository.findByName(request.getUsername()).get().getRoles();
        String jwt = jwtService.generateToken(userDetails.getUsername(), role);

        return ResponseEntity.ok(new AuthResponse(jwt));
    }
}
