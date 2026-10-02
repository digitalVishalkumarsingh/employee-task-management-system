const taskService = require("../services/taskService");
const {
    validateTask,
    validateStatus
} = require("../validators/taskValidator");

// GET /api/tasks
async function getAllTasks(req, res, next) {
    try {
        const tasks = await taskService.getAllTasks();

        res.status(200).json({
            success: true,
            data: tasks
        });
    } catch (error) {
        next(error);
    }
}

// GET /api/tasks/:id
async function getTaskById(req, res, next) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid task ID."
            });
        }

        const task = await taskService.getTaskById(id);

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        next(error);
    }
}

// POST /api/tasks
async function createTask(req, res, next) {
    try {
        const validation = validateTask(req.body);

        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: "Validation failed.",
                errors: validation.errors
            });
        }

        const task = await taskService.createTask(req.body);

        res.status(201).json({
            success: true,
            message: "Task created successfully.",
            data: task
        });
    } catch (error) {
        next(error);
    }
}

// PUT /api/tasks/:id
async function updateTask(req, res, next) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid task ID."
            });
        }

        const validation = validateTask(req.body);

        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: "Validation failed.",
                errors: validation.errors
            });
        }

        const task = await taskService.updateTask(
            id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Task updated successfully.",
            data: task
        });
    } catch (error) {
        next(error);
    }
}

// PATCH /api/tasks/:id/status
async function updateTaskStatus(req, res, next) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid task ID."
            });
        }

        const { status } = req.body;

        const validation = validateStatus(status);

        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid status.",
                errors: validation.errors
            });
        }

        const task = await taskService.updateTaskStatus(
            id,
            status
        );

        res.status(200).json({
            success: true,
            message: "Task status updated successfully.",
            data: task
        });
    } catch (error) {
        next(error);
    }
}

// DELETE /api/tasks/:id
async function deleteTask(req, res, next) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid task ID."
            });
        }

        const result = await taskService.deleteTask(id);

        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask
};
