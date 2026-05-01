const express = require("express");
const router = express.Router();

const { createProject, getProjects } = require("../controllers/projectController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// admin creates project
router.post("/", protect, adminOnly, createProject);

// users see their projects
router.get("/", protect, getProjects);

module.exports = router;