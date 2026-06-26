const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

//create route
router.post("/", protect, createProject);

//get route
router.get("/", protect, getProjects);

//Route to get a single project 
router.get("/:id",protect,getProjectById)

//route to update the project
router.put("/:id",protect,updateProject)

//route to delete the project
router.delete("/:id",protect,deleteProject)

module.exports = router;