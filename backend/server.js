const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


app.use(
  cors({
    origin: ["http://localhost:3000"], // your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// routes
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API running");
});

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});