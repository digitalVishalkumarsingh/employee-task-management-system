const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {
    testDatabaseConnection
} = require("./config/database");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

// Health check
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Employee Task Manager API is running"
    });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);

    await testDatabaseConnection();
});
