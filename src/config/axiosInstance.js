import axios from "axios";
import store from "../redux/store";

let PROD_BASE_URL = "https://codinghumans.herokuapp.com/";
// let DEV_BASE_URL = "http://192.168.225.248:5000/";

const axiosInstance = axios.create({
    baseURL: PROD_BASE_URL
});

let state = store.getState();

axiosInstance.interceptors.request.use((config) => {

    console.log("STATE", state);
    let userToken = state.oauth.userToken;

    config.headers.Authorization = `Bearer ${userToken}`;

    console.log("CF", config);
    return config;
});


export default axiosInstance;