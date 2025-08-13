package com.hexaware.automobile.insurancesystem.security;



import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.hexaware.automobile.insurancesystem.entities.User;

public class UserInfoUserDetails implements UserDetails {

    private String username;
    private String password;
    private List<GrantedAuthority> authorities;

    public UserInfoUserDetails(User user) {
        this.username = user.getName();
        this.password = user.getPassword();
        
        this.authorities = Arrays.stream(user.getRoles().split(","))
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.trim()))
                .collect(Collectors.toList());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;  
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; 
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;  
    }

    @Override
    public boolean isEnabled() {
        return true; 
    }
}