import { useEffect, useState } from "react";

import Layout from "../../components/Layout/Layout";

import { getProjects } from "../../services/projectService";
import {
    generateTasks,
    saveGeneratedTasks,
} from "../../services/aiService";

import "./Ai.css";

function Ai() {

    // ==============================
    // State Variables
    // ==============================

    const [projects, setProjects] = useState([]);

    const [selectedProject, setSelectedProject] = useState("");

    const [projectDescription, setProjectDescription] = useState("");

    const [generatedTasks, setGeneratedTasks] = useState([]);

    const [selectedTasks, setSelectedTasks] = useState([]);

    const [loading, setLoading] = useState(false);

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
    // Generate AI Tasks
    // ==============================

    async function handleGenerateTasks() {

        if (!selectedProject) {

            alert("Please select a project.");

            return;

        }

        if (!projectDescription.trim()) {

            alert("Please enter the project description.");

            return;

        }

        try {

            setLoading(true);

            const project = projects.find(

                (project) => project._id === selectedProject

            );

            const tasks = await generateTasks({

                projectTitle: project.title,

                projectDescription,

            });

            setGeneratedTasks(tasks);

            setSelectedTasks(tasks);

        }

        catch (error) {

            console.log(error);

            alert("Failed to Generate Tasks");

        }

        finally {

            setLoading(false);

        }

    }

    // ==============================
    // Select / Unselect Tasks
    // ==============================

    function handleCheckbox(task) {

        const exists = selectedTasks.find(

            (item) => item.title === task.title

        );

        if (exists) {

            setSelectedTasks(

                selectedTasks.filter(

                    (item) => item.title !== task.title

                )

            );

        }

        else {

            setSelectedTasks([

                ...selectedTasks,

                task,

            ]);

        }

    }

    
    // ==============================
    // Save Selected AI Tasks
    // ==============================

    async function handleSaveTasks() {

        if (!selectedProject) {

            alert("Please select a project.");

            return;

        }

        if (selectedTasks.length === 0) {

            alert("Please select at least one task.");

            return;

        }

        try {

            await saveGeneratedTasks({

                projectId: selectedProject,

                tasks: selectedTasks,

            });

            alert("Tasks Saved Successfully!");

            // Clear Generated Tasks
            setGeneratedTasks([]);

            setSelectedTasks([]);

            setProjectDescription("");

        }

        catch (error) {

            console.log(error);

            alert("Failed to Save Tasks");

        }

    }

    return (

        <Layout>

            <h1>

                AI Assistant

            </h1>

            <p className="ai-subtitle">

                Generate project tasks using AI.

            </p>

            {/* ========================= */}

            {/* Project Selection */}

            {/* ========================= */}

            <div className="ai-form">

                <label>

                    Select Project

                </label>

                <select

                    value={selectedProject}

                    onChange={(event) =>

                        setSelectedProject(

                            event.target.value

                        )

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

                <label>

                    Project Description

                </label>

                <textarea

                    rows="6"

                    placeholder="Describe your project..."

                    value={projectDescription}

                    onChange={(event) =>

                        setProjectDescription(

                            event.target.value

                        )

                    }

                />

                <button

                    onClick={handleGenerateTasks}

                    disabled={loading}

                >

                    {

                        loading

                            ? "Generating..."

                            : "✨ Generate Tasks"

                    }

                </button>

            </div>

            {/* ========================= */}

            {/* Generated Tasks */}

            {/* ========================= */}

            {

                generatedTasks.length > 0 && (

                    <div className="generated-tasks">

                        <h2>

                            Generated Tasks

                        </h2>

                        {

                            generatedTasks.map(

                                (task, index) => (

                                    <div

                                        key={index}

                                        className="generated-task"

                                    >

                                        <input

                                            type="checkbox"

                                            checked={

                                                selectedTasks.some(

                                                    (item) =>

                                                        item.title === task.title

                                                )

                                            }

                                            onChange={() =>

                                                handleCheckbox(task)

                                            }

                                        />

                                        <div>

                                            <h3>

                                                {task.title}

                                            </h3>

                                            <p>

                                                {task.description}

                                            </p>

                                            <span>

                                                Priority:

                                                {" "}

                                                {task.priority}

                                            </span>

                                        </div>

                                    </div>

                                )

                            )

                        }

                        <button

                            className="save-btn"

                            onClick={handleSaveTasks}

                        >

                            💾 Save Selected Tasks

                        </button>

                    </div>

                )

            }

        </Layout>

    );

}

export default Ai;