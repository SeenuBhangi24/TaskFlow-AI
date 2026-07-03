import { useEffect, useState } from "react";

import Layout from "../../components/Layout/Layout";
import DashboardCard from "../../components/DashboardCard/DashboardCard";

import { getDashboardData } from "../../services/dashboardService";

import "./Dashboard.css";

function Dashboard() {

    // ==============================
    // State Variables
    // ==============================

    const [dashboardData, setDashboardData] = useState({

        totalProjects: 0,

        totalTasks: 0,

        completedTasks: 0,

        pendingTasks: 0,

        inProgressTasks: 0,

        recentTasks: [],

        highPriorityTasks: [],

    });

    const [loading, setLoading] = useState(true);

    // ==============================
    // Load Dashboard Data
    // ==============================

    useEffect(() => {

        async function fetchDashboardData() {

            try {

                const data = await getDashboardData();

                setDashboardData(data);

            }

            catch (error) {

                console.log(error);

            }

            finally {

                setLoading(false);

            }

        }

        fetchDashboardData();

    }, []);

    // ==============================
    // Loading
    // ==============================

    if (loading) {

        return (

            <Layout>

                <h2>Loading Dashboard...</h2>

            </Layout>

        );

    }

    return (

        <Layout>

            <h1>Dashboard</h1>

            <p className="dashboard-subtitle">

                Welcome to TaskFlow AI

            </p>

            {/* ========================= */}

            {/* Statistics */}

            {/* ========================= */}

            <div className="dashboard-grid">

                <DashboardCard

                    title="Projects"

                    value={dashboardData.totalProjects}

                />

                <DashboardCard

                    title="Tasks"

                    value={dashboardData.totalTasks}

                />

                <DashboardCard

                    title="Completed"

                    value={dashboardData.completedTasks}

                />

                <DashboardCard

                    title="Pending"

                    value={dashboardData.pendingTasks}

                />

                <DashboardCard

                    title="In Progress"

                    value={dashboardData.inProgressTasks}

                />

            </div>

            {/* ========================= */}

            {/* Recent Tasks */}

            {/* ========================= */}

            <div className="dashboard-section">

                <h2>

                    Recent Tasks

                </h2>

                {

                    dashboardData.recentTasks.length > 0

                        ?

                        dashboardData.recentTasks.map((task) => (

                            <div

                                key={task._id}

                                className="dashboard-task"

                            >

                                <h4>

                                    {task.title}

                                </h4>

                                <p>

                                    Status : {task.status}

                                </p>

                                <p>

                                    Priority : {task.priority}

                                </p>

                            </div>

                        ))

                        :

                        <p>

                            No Recent Tasks

                        </p>

                }

            </div>

            {/* ========================= */}

            {/* High Priority Tasks */}

            {/* ========================= */}

            <div className="dashboard-section">

                <h2>

                    High Priority Tasks

                </h2>

                {

                    dashboardData.highPriorityTasks.length > 0

                        ?

                        dashboardData.highPriorityTasks.map((task) => (

                            <div

                                key={task._id}

                                className="dashboard-task"

                            >

                                <h4>

                                    {task.title}

                                </h4>

                                <p>

                                    Status : {task.status}

                                </p>

                                <p>

                                    Priority : {task.priority}

                                </p>

                            </div>

                        ))

                        :

                        <p>

                            No High Priority Tasks

                        </p>

                }

            </div>

        </Layout>

    );

}

export default Dashboard;