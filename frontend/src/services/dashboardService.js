import api from "./api";

// Get Dashboard Data
export async function getDashboardData() {

    // Get Token from Local Storage
    const token = localStorage.getItem("token");

    // Call Dashboard API
    const response = await api.get("/dashboard", {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    return response.data;

}