import axios from "axios";
import Cookies from "js-cookie";


const GlobalApi = axios.create({
  baseURL: "https://timbu-api.onrender.com",
});


GlobalApi.interceptors.request.use((config) => {
  let token = Cookies.get("token");
    
  // check of token already exists (user is logged in)
  if (token) {
    console.log(token)
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default GlobalApi;