
import localStorageService from "./localStorageService";
import axios from "../../axios/axios"
class JwtAuthService {

  loginWithEmailAndPassword = (email, password) => {
    return axios.post("/api/users/login/", { email: email, password: password }).then(data => {
      this.setSession(data.data.access);
      this.setUser(data.data);
      return data.data;
    });
  };

  loginWithToken = () => {
    return axios.get("/api/users/check-authentication/")
      .then(data => {
        this.setSession(data.data.access)
        this.setUser(data.data);
        return data.data
      })
      .catch((err) => {
        return undefined
      })
  };



  logout = () => {
    this.setSession(null);
    this.removeUser();
  }

  setSession = token => {
    if (token) {
      localStorageService.setItem("jwt_token", token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      localStorage.removeItem("jwt_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };
  setUser = (user) => {
    localStorageService.setItem("auth_user", user);
  }
  removeUser = () => {
    localStorage.removeItem("auth_user");
  }
}

export default new JwtAuthService();
