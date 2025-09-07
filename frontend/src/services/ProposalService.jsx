import http from "./http-common";

class ProposalService {
  add(proposal) {
    return http.post("api/proposals/add", proposal);
  }

  update(proposal) {
    return http.put("api/proposals/update", proposal);
  }

  getById(id) {
    return http.get(`api/proposals/getById/${id}`);
  }

  getAll() {
    return http.get("api/proposals/getAll");
  }

  delete(id) {
    return http.delete(`api/proposals/deleteById/${id}`);
  }

  getByUserId(userId) {
  return http.get(`api/proposals/getByUser/${userId}`);
}

}

export default new ProposalService();
