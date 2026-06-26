const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

//Create Task
router.post("/", protect, createTask);

//to get tasks
router.get("/project/:projectId", protect, getTasks);

//to get single task
router.get("/:id", protect, getTaskById);

//toupdate task
router.put("/:id", protect, updateTask);

//to delete single task
router.delete("/:id", protect, deleteTask);


module.exports = router;