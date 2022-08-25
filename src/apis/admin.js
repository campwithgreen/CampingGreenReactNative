import axiosInstance from "../config/axiosInstance";

function queryStringBuilder(query) {
    let { userId } = query;
    let queryString = "";
    if (userId) {
        queryString += "userId=" + userId;

    }
    return queryString;
}

export function getAllUsers() {
    let endpoint = `v2/auth/getAllUsers`;
    return axiosInstance.get(endpoint);
}


export function searchUser(query) {
    let endpoint = "v2/auth/searchUser";
    return axiosInstance.post(endpoint, query);
}


export function getAllOrders(query) {
    let endpoint = `v2/cart/getAllCarts`;
    let queryString;
    if (query?.userId) {
        queryString = queryStringBuilder(query);
        endpoint = `v2/cart/getAllCarts?${queryString}`;
    }
    return axiosInstance.get(endpoint);
}


export function updateOrderStatus(body, cartId) {
    let endpoint = `/v2/cart/${cartId}`;
    return axiosInstance.put(endpoint, body);
}