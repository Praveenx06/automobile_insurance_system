import http from "./http-common";

class VehicleService {
  getAll() {
    return http.get("api/vehicles/getAll");
  }

  getById(id) {
    return http.get(`api/vehicles/getById/${id}`);
  }

  getByType(type) {
    return http.get(`api/vehicles/type/${type}`);
  }

  add(vehicle) {
    return http.post("api/vehicles/add", vehicle);
  }

  update(vehicle) {
    return http.put("api/vehicles/update", vehicle);
  }

  delete(id) {
    return http.delete(`api/vehicles/deleteById/${id}`);
  }
}

export default new VehicleService();
