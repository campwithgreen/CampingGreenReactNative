import axiosInstance from "../config/axiosInstance";


function queryStringBuilder(query) {
    let { cartId } = query;
    let queryString = "";
    if (cartId) {
        queryString += "cartId=" + cartId;

    }
    return queryString;
}


export function createOrUpdateCart(data, query) {
    let queryString;
    if (query) {
        queryString = queryStringBuilder(query);
    }
    let endpoint = `v2/cart?${queryString}`;
    return axiosInstance.post(endpoint, data);
}

export function checkoutCart(data, query) {
    let queryString;
    if (query) {
        queryString = queryStringBuilder(query);
    }
    let endpoint = `v2/cart/checkoutcart?${queryString}`;
    return axiosInstance.post(endpoint, data);
}

export function getUserCartHistory() {
    return axiosInstance.get("v2/cart");
}