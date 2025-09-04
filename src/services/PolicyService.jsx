import http from "./http-common";

class PolicyService {
  add(policy) {
    return http.post("api/policies/add", policy);
  }

  update(policy) {
    return http.put("api/policies/update", policy);
  }

  getById(id) {
    return http.get(`api/policies/getById/${id}`);
  }

  getAll() {
    return http.get("api/policies/getAll");
  }

  delete(id) {
    return http.delete(`api/policies/deleteById/${id}`);
  }
}

export default new PolicyService();
