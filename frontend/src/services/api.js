import axios from "axios";

// Create Axios Instance
const api = axios.create({

    // Backend Base URL
    baseURL: "http://localhost:5000/api",

});

// Export Axios Instance
export default api;