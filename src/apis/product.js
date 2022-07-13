import axiosInstance from "../config/axiosInstance";


function queryStringBuilder(data) {
    console.log("DATA", data);
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
    console.log("DATA", data);
    let queryString;
    if (data) {
        queryString = queryStringBuilder(data);
    }
    let endpoint = `v2/item?${queryString}`;
    return axiosInstance.get(endpoint);
}