const express = require("express");
const router = express.Router();

const { createProject, getProjects } = require("../controllers/projectController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// ONLY ADMIN CAN CREATE PROJECT
router.post("/", protect, adminOnly, createProject);

// BOTH CAN VIEW
router.get("/", protect, getProjects);

module.exports = router;