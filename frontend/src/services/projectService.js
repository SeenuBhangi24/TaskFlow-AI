import api from "./api";

// Get Token
function getToken() {

    return localStorage.getItem("token");

}

// Get All Projects
export async function getProjects() {

    const response = await api.get("/projects", {

        headers: {

            Authorization: `Bearer ${getToken()}`

        }

    });

    return response.data;

}

// Create Project
export async function createProject(projectData) {

    const response = await api.post(
        "/projects",
        projectData,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;

}

// Update Project
export async function updateProject(id, projectData) {

    const response = await api.put(
        `/projects/${id}`,
        projectData,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;

}

// Delete Project
export async function deleteProject(id) {

    const response = await api.delete(
        `/projects/${id}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;

}