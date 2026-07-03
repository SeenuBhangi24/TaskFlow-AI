import api from "./api";

// Register User
export async function registerUser(userData) {

    const response = await api.post(
        "/auth/register",
        userData
    );

    return response.data;
}

// Login User
export async function loginUser(userData) {

    const response = await api.post(
        "/auth/login",
        userData
    );

    return response.data;
}