const { pool } = require("../config/database");

// Get all tasks
async function getAllTasks() {
    const [rows] = await pool.execute(`
        SELECT
            id,
            title,
            description,
            priority,
            status,
            due_date AS dueDate,
            created_at AS createdAt,
            updated_at AS updatedAt
        FROM tasks
        ORDER BY created_at DESC
    `);

    return rows;
}

// Get task by ID
async function getTaskById(id) {
    const [rows] = await pool.execute(
        `
        SELECT
            id,
            title,
            description,
            priority,
            status,
            due_date AS dueDate,
            created_at AS createdAt,
            updated_at AS updatedAt
        FROM tasks
        WHERE id = ?
        `,
        [id]
    );

    return rows[0];
}

// Create task
async function createTask(task) {
    const [result] = await pool.execute(
        `
        INSERT INTO tasks
        (title, description, priority, status, due_date)
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            task.title,
            task.description || null,
            task.priority,
            task.status,
            task.dueDate
        ]
    );

    return getTaskById(result.insertId);
}

// Update task
async function updateTask(id, task) {
    const [result] = await pool.execute(
        `
        UPDATE tasks
        SET
            title = ?,
            description = ?,
            priority = ?,
            status = ?,
            due_date = ?
        WHERE id = ?
        `,
        [
            task.title,
            task.description || null,
            task.priority,
            task.status,
            task.dueDate,
            id
        ]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return getTaskById(id);
}

// Update task status
async function updateTaskStatus(id, status) {
    const [result] = await pool.execute(
        `
        UPDATE tasks
        SET status = ?
        WHERE id = ?
        `,
        [status, id]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return getTaskById(id);
}

// Delete task
async function deleteTask(id) {
    const [result] = await pool.execute(
        `
        DELETE FROM tasks
        WHERE id = ?
        `,
        [id]
    );

    return result.affectedRows > 0;
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask
};
