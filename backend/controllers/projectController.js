const Project = require("../models/Project");

// Create Project
const createProject = async (req, res) => {
  try {
    // Get data from frontend
    const { title, description } = req.body;

    // Check required fields
    if (!title || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Create project
    const project = await Project.create({
      title,
      description,

      // Logged-in user's id (comes from auth middleware)
      owner: req.user.id,
    });

    res.status(201).json({
      message: "Project Created Successfully",
      project,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Projects
const getProjects = async (req, res) => {
  try {

    // Find projects created by logged-in user
    const projects = await Project.find({
      owner: req.user.id,
    });

    res.status(200).json(projects);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Single Project
const getProjectById = async (req, res) => {
  try {

    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    // Check ownership
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    res.status(200).json(project);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// Update Project
const updateProject = async (req, res) => {
  try {

    // Get project id from URL
    const { id } = req.params;

    // Get updated data
    const { title, description } = req.body;

    // Find project
    const project = await Project.findById(id);

    // Check project exists
    if (!project) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    // Update fields
    project.title = title;
    project.description = description;

    // Save updated project
    await project.save();

    res.status(200).json({
      message: "Project Updated Successfully",
      project,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};


// Delete Project
const deleteProject = async (req, res) => {
  try {

    // Get project id
    const { id } = req.params;

    // Find project
    const project = await Project.findById(id);

    // Check project exists
    if (!project) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    // Delete project
    await project.deleteOne();

    res.status(200).json({
      message: "Project Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};