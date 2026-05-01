const Task = require("../models/Task");

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const { title, project } = req.body;

    if (!title || !project) {
      return res.status(400).json({ message: "Title and project required" });
    }

    const task = await Task.create({
      title,
      project,
      status: "todo",
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET TASKS
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE STATUS (FIXED)
const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // status cycle
    if (task.status === "todo") task.status = "inprogress";
    else if (task.status === "inprogress") task.status = "done";
    else task.status = "todo";

    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
};