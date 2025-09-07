package com.hexaware.automobile.insurancesystem.security;
/* Author : Praveen   
 * Modified on : 13-Aug-2025
 * Description :UserInfoUserDetailsServiceImp 
 * */


import com.hexaware.automobile.insurancesystem.entities.User;
import com.hexaware.automobile.insurancesystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserInfoUserDetailsServiceImp implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username /* email */) throws UsernameNotFoundException {
        User u = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
        return new UserInfoUserDetails(u);
    }
}
