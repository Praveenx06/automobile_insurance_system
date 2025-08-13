package com.hexaware.automobile.insurancesystem.security;






import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.hexaware.automobile.insurancesystem.entities.User;
import com.hexaware.automobile.insurancesystem.repository.UserRepository;

@Service
public class UserInfoUserDetailsServiceImp implements UserDetailsService {
	@Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Optional<User> userOpt = userRepository.findByName(name);

        User user = userOpt.orElseThrow(() -> 
            new UsernameNotFoundException("User not found with username: " + name));

        return new UserInfoUserDetails(user);
    }
}
