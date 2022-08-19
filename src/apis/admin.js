import axiosInstance from "../config/axiosInstance";


export function getAllUsers() {
    let endpoint = `v2/auth/getAllUsers`;
    return axiosInstance.get(endpoint);
}