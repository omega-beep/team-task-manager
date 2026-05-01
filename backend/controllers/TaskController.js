const Task = require("../models/Task");
const Project = require("../models/Project");

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const { title, project, dueDate } = req.body;

    if (!title || !project) {
      return res.status(400).json({ message: "Title & project required" });
    }

    const projectExists = await Project.findById(project);
    if (!projectExists) {
      return res.status(404).json({ message: "Project not found" });
    }

    const task = await Task.create({
      title,
      project,
      dueDate,
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
    const tasks = await Task.find({
      project: req.params.projectId,
    }).populate("assignedTo", "name");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE STATUS
const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.status === "todo") task.status = "inprogress";
    else if (task.status === "inprogress") task.status = "done";
    else task.status = "todo";

    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DASHBOARD
const getDashboard = async (req, res) => {
  try {
    const tasks = await Task.find();

    const now = new Date();

    const stats = {
      total: tasks.length,
      completed: tasks.filter(t => t.status === "done").length,
      pending: tasks.filter(t => t.status !== "done").length,
      overdue: tasks.filter(
        t => t.dueDate && t.dueDate < now && t.status !== "done"
      ).length,
    };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  getDashboard,
};