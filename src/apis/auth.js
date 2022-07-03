import axiosInstance from "../config/axiosInstance";

export function getOtp(data) {
    return axiosInstance.post("v2/auth/authDoor", data);
}

export function register(data) {
    return axiosInstance.post("v2/auth/register", data);
}