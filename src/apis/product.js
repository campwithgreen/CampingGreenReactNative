import axiosInstance from "../config/axiosInstance";

export function getAllProducts() {
    return axiosInstance.get("v2/product");
}