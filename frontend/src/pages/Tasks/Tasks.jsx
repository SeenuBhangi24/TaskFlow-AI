import { useEffect, useState } from "react";

import Layout from "../../components/Layout/Layout";
import TaskCard from "../../components/TaskCard/TaskCard";

import { getProjects } from "../../services/projectService";

import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
} from "../../services/taskService";

import "./Tasks.css";

function Tasks() {

    // ==============================
    // State Variables
    // ==============================

    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [selectedProject, setSelectedProject] = useState("");

    const [editingTask, setEditingTask] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
    });

    // ==============================
    // Load Projects
    // ==============================

    useEffect(() => {

        async function fetchProjects() {

            try {

                const data = await getProjects();

                setProjects(data);

            }

            catch (error) {

                console.log(error);

            }

        }

        fetchProjects();

    }, []);

    // ==============================
    // Load Tasks
    // ==============================

    useEffect(() => {

        if (selectedProject) {

            loadTasks(selectedProject);

        }

    }, [selectedProject]);

    // ==============================
    // Load Tasks Function
    // ==============================

    async function loadTasks(projectId) {

        try {

            const data = await getTasks(projectId);

            setTasks(data);

        }

        catch (error) {

            console.log(error);

        }

    }

    // ==============================
    // Handle Edit
    // ==============================

    function handleEdit(task) {

        setEditingTask(task);

        setFormData({

            title: task.title,

            description: task.description,

            priority: task.priority,

            dueDate: task.dueDate
                ? task.dueDate.substring(0, 10)
                : "",

        });

    }

    // ==============================
    // Handle Delete
    // ==============================

    async function handleDelete(taskId) {

        const confirmDelete = window.confirm(

            "Are you sure you want to delete this task?"

        );

        if (!confirmDelete) {

            return;

        }

        try {

            await deleteTask(taskId);

            alert("Task Deleted Successfully");

            await loadTasks(selectedProject);

        }

        catch (error) {

            console.log(error);

            alert("Failed to Delete Task");

        }

    }

    // ==============================
async function handleStatusChange(task, newStatus) {

    try {

        const updatedTask = {

            title: task.title,

            description: task.description,

            status: newStatus,

            priority: task.priority,

            dueDate: task.dueDate,

            project: task.project,

        };

        await updateTask(task._id, updatedTask);

        await loadTasks(selectedProject);

    }

    catch (error) {

        console.log(error);

    }

}
    // ==============================
    // Handle Input Change
    // ==============================

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData({

            ...formData,

            [name]: value,

        });

    }

    // ==============================
    // Handle Submit
    // ==============================

    async function handleSubmit(event) {

        event.preventDefault();

        if (!selectedProject) {

            alert("Please select a project.");

            return;

        }

        try {

            const taskData = {

                ...formData,

                project: selectedProject,

            };

            // Update Task

            if (editingTask) {

                await updateTask(

                    editingTask._id,

                    taskData

                );

                alert("Task Updated Successfully");

            }

            // Create Task

            else {

                await createTask(taskData);

                alert("Task Created Successfully");

            }

            // Reload Tasks

            await loadTasks(selectedProject);

            // Clear Form

            setFormData({

                title: "",

                description: "",

                priority: "Medium",

                dueDate: "",

            });

            // Exit Edit Mode

            setEditingTask(null);

        }

        catch (error) {

            console.log(error);

            alert("Operation Failed");

        }

    }

    return (

        <Layout>

            <h1>Tasks</h1>

            <p className="tasks-subtitle">

                Manage your tasks here.

            </p>

            {/* Project Dropdown */}

            <div className="task-filter">

                <label>

                    Select Project

                </label>

                <select

                    value={selectedProject}

                    onChange={(event) =>
                        setSelectedProject(event.target.value)
                    }

                >

                    <option value="">

                        Choose Project

                    </option>

                    {

                        projects.map((project) => (

                            <option
                                key={project._id}
                                value={project._id}
                            >

                                {project.title}

                            </option>

                        ))

                    }

                </select>

            </div>

            {/* Task Form */}

            <form

                className="task-form"

                onSubmit={handleSubmit}

            >

                <input

                    type="text"

                    name="title"

                    placeholder="Task Title"

                    value={formData.title}

                    onChange={handleChange}

                    required

                />

                <textarea

                    name="description"

                    placeholder="Task Description"

                    value={formData.description}

                    onChange={handleChange}

                    required

                />

                <select

                    name="priority"

                    value={formData.priority}

                    onChange={handleChange}

                >

                    <option value="Low">Low</option>

                    <option value="Medium">Medium</option>

                    <option value="High">High</option>

                </select>

                <input

                    type="date"

                    name="dueDate"

                    value={formData.dueDate}

                    onChange={handleChange}

                />

                <button type="submit">

                    {

                        editingTask

                            ? "Update Task"

                            : "Create Task"

                    }

                </button>

            </form>

            {/* Task List */}

            <div className="task-list">

                {

                    tasks.length > 0 ?

                        tasks.map((task) => (

                            <TaskCard

                                key={task._id}

                                task={task}

                                onEdit={handleEdit}

                                onDelete={handleDelete}

                                onStatusChange={handleStatusChange}

                            />

                        ))

                        :

                        <p>No Tasks Found</p>

                }

            </div>

        </Layout>

    );

}

export default Tasks;