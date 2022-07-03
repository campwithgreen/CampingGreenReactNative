import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "http://192.168.225.248:5000/"
});

axiosInstance.interceptors.request.use((config) => {

    //TO DO ADD TOKEN FROM STORE
    config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzA1OGY5YmQ1ZGIyMmI2NTEwNWM5ZCIsImlhdCI6MTY1Njc3MjkyNywiZXhwIjoxNjU5MzY0OTI3fQ.DZ3UBnhXMHDJIFNCHKFWepnn5prUvq1vwXFtF2L8ZiQ";

    console.log("CF", config);
    return config;
});


export default axiosInstance;