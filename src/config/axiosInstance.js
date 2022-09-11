import axios from "axios";
import store from "../redux/store";

let PROD_BASE_URL = "https://codinghumans.herokuapp.com/";
// let DEV_BASE_URL = "http://192.168.225.248:5000/";

const axiosInstance = axios.create({
    baseURL: PROD_BASE_URL
});



axiosInstance.interceptors.request.use(async (config) => {

    let state = store.getState();
    let userToken = await state?.oauth?.userToken;
    console.log("USER TOKEN", userToken);
    config.headers.Authorization = `Bearer ${userToken}`;
    console.log("CONFIG ==>", config);
    return config;

});


export default axiosInstance;