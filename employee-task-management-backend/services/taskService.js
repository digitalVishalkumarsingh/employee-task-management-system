const taskModel = require("../models/taskModel");

// Get all tasks
async function getAllTasks() {
    return await taskModel.getAllTasks();
}

// Get one task
async function getTaskById(id) {
    const task = await taskModel.getTaskById(id);

    if (!task) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    return task;
}

// Create task
async function createTask(data) {
    return await taskModel.createTask(data);
}

// Update task
async function updateTask(id, data) {
    const existingTask = await taskModel.getTaskById(id);

    if (!existingTask) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    return await taskModel.updateTask(id, data);
}

// Update status
async function updateTaskStatus(id, status) {
    const existingTask = await taskModel.getTaskById(id);

    if (!existingTask) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    return await taskModel.updateTaskStatus(id, status);
}

// Delete task
async function deleteTask(id) {
    const existingTask = await taskModel.getTaskById(id);

    if (!existingTask) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    await taskModel.deleteTask(id);

    return {
        id,
        message: "Task deleted successfully"
    };
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask
};
