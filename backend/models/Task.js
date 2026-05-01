const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  status: {
    type: String,
    enum: ["todo", "inprogress", "done"],
    default: "todo"
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);