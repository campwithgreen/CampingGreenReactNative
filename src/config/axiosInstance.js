import axios from "axios";
import store from "../redux/store";

let PROD_BASE_URL = "https://codinghumans.herokuapp.com/";
// let DEV_BASE_URL = "http://192.168.225.248:5000/";
// let NGROK_URL = "https://7db3-49-206-121-110.ngrok.io/";

const axiosInstance = axios.create({
    baseURL: PROD_BASE_URL
});



axiosInstance.interceptors.request.use(async (config) => {

    let state = store.getState();
    let userToken = await state?.oauth?.userToken;
    config.headers.Authorization = `Bearer ${userToken}`;

    console.log("CONFIG ==>", config);
    return config;

});


export default axiosInstance;