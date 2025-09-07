package com.hexaware.automobile.insurancesystem.service;
/* Author : Praveen   
 * Modified on : 12-Aug-2025
 * Description : UserServiceImpTest
 * */
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.annotation.Order;

import com.hexaware.automobile.insurancesystem.dto.UserDto;
import com.hexaware.automobile.insurancesystem.entities.User;
import com.hexaware.automobile.insurancesystem.exception.UserNotFoundException;
@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
class UserServiceImpTest {

	 @Autowired
	    private UserServiceImp userService;

	    private static final int TEST_USER_ID = 2001;
	    private static final String TEST_AADHAAR = "1234567890123456";
	    private static final String USER = "USER";

	    @Test
	    @Order(1)
	    public void testAddUser() {
	        UserDto dto = new UserDto();
	        dto.setUserId(TEST_USER_ID);
	        dto.setName("Test User");
	        dto.setAddress("123 Test St");
	        dto.setEmail("testuser@example.com");
	        dto.setPassword("password123");
	        dto.setDateOfBirth(LocalDate.now().plusDays(1));  // Future or present as per validation
	        dto.setAge(30);
	        dto.setAadhaarNumber(TEST_AADHAAR);
	        dto.setPanNumber("ABCDE1234F");
	        dto.setRoles(USER);

	        User saved = userService.addUser(dto);
	        assertNotNull(saved);
	        assertEquals(TEST_USER_ID, saved.getUserId());
	        assertEquals("Test User", saved.getName());
	    }

	    @Test
	    @Order(2)
	    public void testGetById() {
	        User user = userService.getById(TEST_USER_ID);
	        assertNotNull(user);
	        assertEquals(TEST_USER_ID, user.getUserId());
	    }

	    @Test
	    @Order(3)
	    public void testGetAllUser() {
	        List<UserDto> users = userService.getAllUser();
	        assertNotNull(users);
	        assertTrue(users.size() > 0);
	    }

	    @Test
	    @Order(4)
	    public void testUpdateAddon() {
	        User user = userService.getById(TEST_USER_ID);
	        user.setName("Updated User");
	        User updated = userService.updateAddon(user);
	        assertEquals("Updated User", updated.getName());
	    }

	    @Test
	    @Order(5)
	    public void testGetUsersByAadhaar() {
	        List<User> users = userService.getUsersByAadhaar(TEST_AADHAAR);
	        assertNotNull(users);
	        assertTrue(users.stream().anyMatch(u -> u.getUserId() == TEST_USER_ID));
	    }

	    @Test
	    @Order(6)
	    public void testDeleteUserById() {
	        String msg = userService.deleteUserById(TEST_USER_ID);
	        assertEquals("Record deleted successfully", msg);
	        assertThrows(UserNotFoundException.class, () -> userService.getById(TEST_USER_ID));
	    }
	    
	    @Test
	    @Order
	    public void testGetUsersByUsername() {
	    	Optional<User> users = userService.getByUsername(USER);
	    	assertNotNull(users);
	    }
	

}
