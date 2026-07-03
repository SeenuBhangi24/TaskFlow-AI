import api from "./api";

// Get Token
function getToken() {

    return localStorage.getItem("token");

}

// Get Tasks of a Project
export async function getTasks(projectId) {

    const response = await api.get(

        `/tasks/project/${projectId}`,

        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

    );

    return response.data;

}
// Create Task
export async function createTask(taskData) {

    const response = await api.post(

        "/tasks",

        taskData,

        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

    );

    return response.data;

}

// Update Task
export async function updateTask(id, taskData) {

    const response = await api.put(

        `/tasks/${id}`,

        taskData,

        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

    );

    return response.data;

}

// Delete Task
export async function deleteTask(id) {

    const response = await api.delete(

        `/tasks/${id}`,

        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

    );

    return response.data;

}