import http from "./http-common";

class UserService {
  // Add a user
  add(user) {
    return http.post("api/users/add", user);
  }

  // Update a user
  update(user) {
    return http.put("api/users/update", user);
  }

  // Get user by ID
  getById(userId) {
    return http.get(`api/users/${userId}`);
  }

  // Get all users
  getAll() {
    return http.get("api/users/getall");
  }

  // Delete user by ID
  delete(userId) {
    return http.delete(`api/users/deletebyId/${userId}`);
  }

  // Get user by Aadhaar
  getByAadhaar(aadhaarNumber) {
    return http.get(`api/users/aadhaar/${aadhaarNumber}`);
  }

  // Get user by username
  getByUsername(name) {
    return http.get(`api/users/findbyUsername/${name}`);
  }

  // Get user by email
  getByEmail(email) {
    return http.get(`api/users/email/${email}`);
  }
}

export default new UserService();
