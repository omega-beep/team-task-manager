const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


app.use(cors());
app.options("*", cors());

app.use(express.json());

// routes
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});