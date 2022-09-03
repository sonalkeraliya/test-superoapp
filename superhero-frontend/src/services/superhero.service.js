import http from "../http-common";
class SuperHeroDataService {
  getAll() {
    return http.get("/superheros");
  }
  get(id) {
    return http.get(`/superheros/${id}`);
  }
  create(data) {
    return http.post("/superheros", data);
  }
  update(id, data) {
    return http.put(`/superheros/${id}`, data);
  }
  delete(id) {
    return http.delete(`/superheros/${id}`);
  }
 
}
export default new SuperHeroDataService();