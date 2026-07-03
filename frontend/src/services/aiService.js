import api from "./api";

// Get Token
function getToken() {

    return localStorage.getItem("token");

}

// Generate AI Tasks
export async function generateTasks(projectData) {

    const response = await api.post(

        "/ai/generate-tasks",

        projectData,

        {

            headers: {

                Authorization: `Bearer ${getToken()}`

            }

        }

    );

    return response.data;

}

// Save Generated Tasks
export async function saveGeneratedTasks(data) {

    const response = await api.post(

        "/ai/save-generated-tasks",

        data,

        {

            headers: {

                Authorization: `Bearer ${getToken()}`

            }

        }

    );

    return response.data;

}