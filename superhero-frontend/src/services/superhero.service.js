import http from "../api/http-common";
import superheroE from "../api/superhero-external";
class SuperHeroDataService {
  getAll() {
    return http.get("/superheros/");
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
  findByName(name) {
    return superheroE.get(`/search/${name}`)
  }
 
}
export default new SuperHeroDataService();