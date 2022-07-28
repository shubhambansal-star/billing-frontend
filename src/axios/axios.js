import axios from "axios"
import localStorageService from "../app/services/localStorageService";
const token = localStorageService.getItem('jwt_token')
axios.defaults.xsrfCookieName = "csrftoken"
axios.defaults.xsrfHeaderName = "X-CSRFToken"
if (token!==null){
axios.defaults.headers.common["Authorization"] = "Bearer " + token;}
export default axios.create({
  baseURL: "http://192.168.0.164:8000/",
})
