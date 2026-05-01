const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ===== MIDDLEWARE =====
app.use(cors({
  origin: ["http://localhost:3000"], // allow frontend
  credentials: true
}));

app.use(express.json());

// ===== ROUTES IMPORT =====
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

// ===== ROUTES =====
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// ===== ROOT ROUTE =====
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ===== DATABASE CONNECT =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Error:", err);
  });

// ===== SERVER START =====
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});