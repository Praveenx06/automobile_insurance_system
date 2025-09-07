import http from "./http-common";

class ClaimService {
  add(claim) {
    return http.post("api/claims/add", claim);
  }

  update(claim) {
    return http.put("api/claims/update", claim);
  }

  getById(id) {
    return http.get(`api/claims/getById/${id}`);
  }

  getAll() {
    return http.get("api/claims/getAll");
  }

  delete(id) {
    return http.delete(`api/claims/deleteById/${id}`);
  }

  getByDateRange(startDate, endDate) {
    return http.get(`api/claims/dateRange?startDate=${startDate}&endDate=${endDate}`);
  }
}

export default new ClaimService();
