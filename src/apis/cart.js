import axiosInstance from "../config/axiosInstance";


function queryStringBuilder(query) {
    let { cartId } = query;
    console.log("QUERY C", cartId);
    let queryString = "";
    if (cartId) {
        queryString += "cartId=" + cartId;

    }
    return queryString;
}


export function createOrUpdateCart(data, query) {
    console.log("QRY", query);
    let endpoint = "v2/cart";
    let queryString;
    if (query?.cartId) {
        queryString = queryStringBuilder(query);
        endpoint = `v2/cart?${queryString}`;
    }

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

export function getUserCartHistory(id, populate) {

    let url = "v2/cart";

    if (id) {
        url = `v2/cart/${id}`;
    }

    if (populate) {
        url = `v2/cart/${id}?populate=${populate}`;
    }

    return axiosInstance.get(url);
}

export function cancelOrder(cartId) {
    let endpoint = `/v2/cart/cancel/${cartId}`;
    return axiosInstance.put(endpoint);
}