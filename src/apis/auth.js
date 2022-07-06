import axiosInstance from "../config/axiosInstance";

export function authDoor(data) {
    return axiosInstance.post("v2/auth/authDoor", data);
}

export function verifyOtp(data) {
    return axiosInstance.post("v2/auth/verifyotp", data);
}

export function register(data) {
    return axiosInstance.post("v2/auth/register", data);
}