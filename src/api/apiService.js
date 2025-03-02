import axiosInstance from "../api/axiosConfig";

function callApi(endpoint, method = "GET", body = null, params = {}) {
    const token = localStorage.getItem("authToken");

    const config = {
        method,
        url: endpoint,
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : undefined,
        },
        params, // <-- Thêm params vào đây để API nhận được
        data: body,
    };

    console.log("📡 callApi Request:", config);

    return axiosInstance(config)
        .then(response => response.data)
        .catch(error => {
            console.error("❌ API call error:", error.response ? error.response.data : error.message);
            throw error;
        });
}

export function GET_ALL(endpoint, params = {}) {
    return callApi(endpoint, "GET", null, params);
}

export function GET_ID(endpoint, id) {
    return callApi(`${endpoint}/${id}`, "GET");
}

export function POST_ADD(endpoint, data) {
    return callApi(endpoint, "POST", data);
}

export function PUT_EDIT(endpoint, data) {
    return callApi(endpoint, "PUT", data);
}

export function DELETE_ID(endpoint) {
    return callApi(endpoint, "DELETE");
}

export function LOGIN(body) {
    const API_URL_LOGIN = "http://localhost:8080/api/login";
    return axiosInstance.post(API_URL_LOGIN, body, {
        headers: {
            accept: "*/*",
            "Content-Type": "application/json",
        },
    }).then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
    });
}
