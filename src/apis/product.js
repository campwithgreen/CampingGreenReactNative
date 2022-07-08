import axiosInstance from "../config/axiosInstance";


function queryStringBuilder(data) {
    let { type, filter } = data;
    let queryString = "";
    if (type) {
        queryString += "type=" + type;

    }
    if (filter) {
        queryString += "&filter=" + filter;
    }
    return queryString;
}


export function getAllProducts(data) {
    let queryString;
    if (data) {
        queryString = queryStringBuilder(data);
    }
    let endpoint = `v2/product?${queryString}`;
    return axiosInstance.get(endpoint);
}