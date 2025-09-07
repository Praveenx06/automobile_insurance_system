package com.hexaware.automobile.insurancesystem.config;
/*
 * Author : Praveen  
 * Modified on : 13-Aug-2025 
 * Description : SecurityConfig
 * 
 */


import com.hexaware.automobile.insurancesystem.security.JwtAuthFilter;
import com.hexaware.automobile.insurancesystem.security.JwtAuthenticationEntryPoint;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final JwtAuthenticationEntryPoint authenticationEntryPoint;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .exceptionHandling(ex -> ex.authenticationEntryPoint(authenticationEntryPoint))
            .authorizeHttpRequests(auth -> auth
//                .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()
//                .requestMatchers("/api/users/**").hasAuthority("ADMIN")
//                .requestMatchers("/auth/**").permitAll() // Public endpoints
//                .requestMatchers("/**").hasAnyAuthority("ADMIN","USER")
//                .requestMatchers("/api/addons/**").hasAnyAuthority("ADMIN", "USER")
//                .requestMatchers("/api/policies/**").hasAnyAuthority("ADMIN", "USER")
//                .requestMatchers("/api/proposals/**").hasAnyAuthority("ADMIN", "USER")
//                .requestMatchers("/api/quote/**").hasAnyAuthority("ADMIN", "USER")
//                .requestMatchers("/api/vehicles/**").hasAnyAuthority("ADMIN", "USER")
//                .anyRequest().authenticated()
            		.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            		.requestMatchers("/api/auth/register", "/api/auth/login").permitAll()
//            	    .requestMatchers("/api/users/**").hasRole("ADMIN")
            	    .requestMatchers("/api/users/add").permitAll()
            	    .requestMatchers("/auth/**").permitAll()
            	    .requestMatchers("/**").hasAnyRole("ADMIN", "USER")
            	    .requestMatchers("/api/users/getall").hasRole("ADMIN")
            	    .requestMatchers("/api/users/update").hasRole("ADMIN")
            	    .requestMatchers("/api/users/deletebyId/**").hasRole("ADMIN")
            	    .requestMatchers("/api/users/**").hasAnyRole("ADMIN", "USER")
            	    .requestMatchers("/api/addons/**").hasAnyRole("ADMIN", "USER")
            	    .requestMatchers("/api/policies/**").hasAnyRole("ADMIN", "USER")
            	    .requestMatchers("/api/proposals/**").hasAnyRole("ADMIN", "USER")
            	    .requestMatchers("/api/quote/**").hasAnyRole("ADMIN", "USER")
            	    .requestMatchers("/api/vehicles/**").hasAnyRole("ADMIN", "USER")
            	    
            	    .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}