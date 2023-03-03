import axios from "axios"
const token = sessionStorage.getItem("jwtToken");
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  export default axios;

// import this token if you want it to be used with existing token except signupand login
