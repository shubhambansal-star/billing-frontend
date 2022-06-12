
import localStorageService from "./localStorageService";
import axios from "../../axios/axios"
class JwtAuthService {
  
  user = {
    userId: "1",
    role: 'ADMIN',
    displayName: "Watson Joyce",
    email: "watsonjoyce@gmail.com",
    photoURL: "/assets/images/face-7.jpg",
    age: 25,
    token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh"
  }
  // loginWithRESTAPI = (email, password) => {
  //   return new Promise((resolve,reject)=>{

  //   })
  // }

  loginWithEmailAndPassword = (email, password) => {
    return axios.post("/api/users/login/",{user:{email:email,password:password}}).then(data => {
      this.setSession(data.data.user.token);
      this.setUser(data.data.user);
      return data.data.user;
    });
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
