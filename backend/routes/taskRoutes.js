const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTaskStatus,
  getDashboard,
} = require("../controllers/TaskController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createTask);
router.get("/:projectId", protect, getTasks);
router.put("/:id", protect, updateTaskStatus);
router.get("/dashboard/stats", protect, getDashboard);

module.exports = router;