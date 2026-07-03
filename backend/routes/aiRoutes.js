const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    generateDescription,
    generateTasks,
    saveGeneratedTasks,
} = require("../controllers/aiController");

// Generate Description
router.post(
    "/generate-description",
    protect,
    generateDescription
);

// Generate Tasks
router.post(
    "/generate-tasks",
    protect,
    generateTasks
);

// Save Generated Tasks
router.post(
    "/save-generated-tasks",
    protect,
    saveGeneratedTasks
);

module.exports = router;