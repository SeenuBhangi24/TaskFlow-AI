const Project = require("../models/Project");
const Task = require("../models/Task");

// ==============================
// Get Dashboard Data
// ==============================

const getDashboardData = async (req, res) => {

    try {

        // Logged-in User
        const userId = req.user.id;

        // ==============================
        // Total Projects
        // ==============================

        const totalProjects = await Project.countDocuments({

            owner: userId,

        });

        // ==============================
        // Get User Projects
        // ==============================

        const projects = await Project.find({

            owner: userId,

        });

        const projectIds = projects.map(

            (project) => project._id

        );

        // ==============================
        // Total Tasks
        // ==============================

        const totalTasks = await Task.countDocuments({

            project: {

                $in: projectIds,

            },

        });

        // ==============================
        // Completed Tasks
        // ==============================

        const completedTasks = await Task.countDocuments({

            project: {

                $in: projectIds,

            },

            status: "Done",

        });

        // ==============================
        // In Progress Tasks
        // ==============================

        const inProgressTasks = await Task.countDocuments({

            project: {

                $in: projectIds,

            },

            status: "In Progress",

        });

        // ==============================
        // Pending Tasks
        // ==============================

        const pendingTasks = await Task.countDocuments({

            project: {

                $in: projectIds,

            },

            status: "To Do",

        });

        // ==============================
        // Recent Tasks
        // ==============================

        const recentTasks = await Task.find({

            project: {

                $in: projectIds,

            },

        })

            .sort({

                createdAt: -1,

            })

            .limit(5);

        // ==============================
        // High Priority Tasks
        // ==============================

        const highPriorityTasks = await Task.find({

            project: {

                $in: projectIds,

            },

            priority: "High",

        })

            .limit(5);

        // ==============================
        // Send Response
        // ==============================

        res.status(200).json({

            totalProjects,

            totalTasks,

            completedTasks,

            inProgressTasks,

            pendingTasks,

            recentTasks,

            highPriorityTasks,

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error",

        });

    }

};

module.exports = {

    getDashboardData,

};