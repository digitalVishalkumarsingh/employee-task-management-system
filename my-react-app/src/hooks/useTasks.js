import { useEffect, useState } from "react";

import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
} from "../Services/taskApi";

export default function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchTasks = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await getTasks();

            setTasks(result.data || result);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (task) => {
        const result = await createTask(task);
        await fetchTasks();
        return result;
    };

    const editTask = async (id, task) => {
        const result = await updateTask(id, task);
        await fetchTasks();
        return result;
    };

    const removeTask = async (id) => {
        const result = await deleteTask(id);
        await fetchTasks();
        return result;
    };

    const changeTaskStatus = async (id, status) => {
        const result = await updateTaskStatus(id, status);
        await fetchTasks();
        return result;
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return {
        tasks,
        loading,
        error,
        addTask,
        editTask,
        removeTask,
        changeTaskStatus,
        refreshTasks: fetchTasks,
    };
}
