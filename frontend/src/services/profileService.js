import api from "./api";

// ==============================
// Get JWT Token
// ==============================

function getToken() {

    return localStorage.getItem("token");

}

// ==============================
// Get User Profile
// ==============================

export async function getProfile() {

    const response = await api.get(

        "/profile",

        {

            headers: {

                Authorization: `Bearer ${getToken()}`

            }

        }

    );

    return response.data;

}