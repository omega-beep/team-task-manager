const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


dotenv.config();

const app = express();

// middleware
app.use(express.json());

// connect database
connectDB();

// routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const testRoutes = require("./routes/testRoutes");
app.use("/api/test", testRoutes);
const projectRoutes = require("./routes/projectRoutes");
app.use("/api/projects", projectRoutes);
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);