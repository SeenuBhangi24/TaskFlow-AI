const Task = require("../models/Task");

// Create Task
const createTask = async (req, res) => {
  try {

    // Get data from frontend
    const { title, description, priority, dueDate, project } = req.body;

    // Check required fields
    if (!title || !description || !project) {
      return res.status(400).json({
        message: "Title, Description and Project are required",
      });
    }

    // Create Task
    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      project,
    });

    res.status(201).json({
      message: "Task Created Successfully",
      task,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};


// Get All Tasks of a Project
const getTasks = async (req, res) => {
  try {

    const { projectId } = req.params;

    const tasks = await Task.find({
      project: projectId,
    });

    res.status(200).json(tasks);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// Get Single Task
const getTaskById = async (req, res) => {
  try {

    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
      });
    }

    res.status(200).json(task);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};


// Update Task
const updateTask = async (req, res) => {
  try {

    const { id } = req.params;

    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
      });
    }

    task.title = title;
    task.description = description;
    task.status = status;
    task.priority = priority;
    task.dueDate = dueDate;

    await task.save();

    res.status(200).json({
      message: "Task Updated Successfully",
      task,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {

    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};


module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};