import { useEffect, useState } from "react";

import Layout from "../../components/Layout/Layout";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

import {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
} from "../../services/projectService";

import "./Projects.css";

function Projects() {

    // ==============================
    // State Variables
    // ==============================

    const [projects, setProjects] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    // Stores selected project while editing
    const [editingProject, setEditingProject] = useState(null);

    // ==============================
    // Load Projects
    // ==============================

    async function loadProjects() {

        try {

            const data = await getProjects();

            setProjects(data);

        }

        catch (error) {

            console.log(error);

        }

    }

    // ==============================
    // Load Projects on Page Load
    // ==============================

    useEffect(() => {

    async function fetchProjects() {

        try {

            const data = await getProjects();

            setProjects(data);

        } catch (error) {

            console.log(error);

        }

    }

    fetchProjects();

    }, []);

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
    // Handle Edit Button
    // ==============================

    function handleEdit(project) {

        // Store selected project
        setEditingProject(project);

        // Fill form with project details
        setFormData({

            title: project.title,

            description: project.description,

        });

    }

    // ==============================
    // Handle Form Submit
    // ==============================

    async function handleSubmit(event) {

        event.preventDefault();

        console.log("Button Clicked");
        console.log(formData);

        try {

            // --------------------------
            // Update Project
            // --------------------------

            if (editingProject) {

                await updateProject(

                    editingProject._id,

                    formData

                );

            }

            // --------------------------
            // Create Project
            // --------------------------

            else {

                await createProject(formData);

            }

            // Refresh Project List
            await loadProjects();

            // Clear Form
            setFormData({

                title: "",

                description: "",

            });

            // Exit Edit Mode
            setEditingProject(null);

        }

        catch (error) {

            console.log(error);

        }

    }


    // ==============================
// Handle Delete Project
// ==============================

async function handleDelete(projectId) {

    // Ask user before deleting
    const confirmDelete = window.confirm(
        "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) {

        return;

    }

    try {

        // Delete Project
        await deleteProject(projectId);

        // Refresh Project List
        const data = await getProjects();

            setProjects(data);

        }

        catch (error) {

            console.log(error);

        }

    }

        return (

        <Layout>

            <h1>Projects</h1>

            <p className="projects-subtitle">
                Manage your projects
            </p>

            {/* Project Form */}

            <form
                className="project-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    name="title"
                    placeholder="Project Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Project Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <button type="submit">

                    {
                        editingProject
                            ? "Update Project"
                            : "Create Project"
                    }

                </button>

            </form>

            {/* Project List */}

            <div className="projects-grid">

                {

                    projects.length > 0 ?

                        projects.map((project) => (

                            <ProjectCard
                                key={project._id}
                                project={project}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />

                        ))

                        :

                        <p>No Projects Found</p>

                }

            </div>

        </Layout>

    );

}

export default Projects;