const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTaskStatus,
} = require("../controllers/TaskController");

const { protect } = require("../middleware/authMiddleware");

// create task
router.post("/", protect, createTask);

// get tasks by project
router.get("/:projectId", protect, getTasks);

// update status
router.put("/:id", protect, updateTaskStatus);

module.exports = router;