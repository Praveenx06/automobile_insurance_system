import http from "./http-common";

class AddonService {
  add(addon) {
    return http.post("api/addons/add", addon);
  }

  update(addon) {
    return http.put("api/addons/update", addon);
  }

  getById(id) {
    return http.get(`api/addons/getById/${id}`);
  }

  getAll() {
    return http.get("api/addons/getAll");
  }

  deleteById(id) {
    return http.delete(`api/addons/deleteById/${id}`);
  }
}

export default new AddonService();
