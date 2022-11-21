import axiosInstance from "../config/axiosInstance";


function queryStringBuilder(data) {
    let { type, filter, location } = data;
    let queryString = "";
    if (type) {
        queryString += "type=" + type;

    }
    if (filter) {
        queryString += "&filter=" + filter;
    }
    if (location) {
        queryString += "&location=" + location;
    }
    return queryString;
}


export function getAllProducts(data) {
    let queryString;
    if (data) {
        queryString = queryStringBuilder(data);
    }
    let endpoint = `v2/item?${queryString}`;
    return axiosInstance.get(endpoint);
}

export function searchLocation(data) {
    let queryString;
    if (data) {
        queryString = queryStringBuilder(data);
    }
    let endpoint = `v2/item/search?${queryString}`;
    return axiosInstance.get(endpoint);
}