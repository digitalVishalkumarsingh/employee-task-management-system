import { useMemo, useState } from "react";

import TaskTable from "../components/TaskTable";
import TaskModal from "../components/TaskModel";

import useTasks from "../hooks/useTasks";

function TasksPage() {
    const {
        tasks,
        loading,
        error,
        addTask,
        editTask,
        changeTaskStatus,
        removeTask
    } = useTasks();

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    const [priorityFilter, setPriorityFilter] =
        useState("All");

    const [isModalOpen, setIsModalOpen] =
        useState(false);

    const [editingTask, setEditingTask] =
        useState(null);

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesSearch =
                task.title
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesStatus =
                statusFilter === "All" ||
                task.status === statusFilter;

            const matchesPriority =
                priorityFilter === "All" ||
                task.priority === priorityFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesPriority
            );
        });
    }, [
        tasks,
        search,
        statusFilter,
        priorityFilter
    ]);

    function handleAddTask() {
        setEditingTask(null);
        setIsModalOpen(true);
    }

    function handleEdit(task) {
        setEditingTask(task);
        setIsModalOpen(true);
    }

    async function handleSave(task) {
        if (editingTask) {
            await editTask(
                editingTask.id,
                task
            );
        } else {
            await addTask(task);
        }

        setIsModalOpen(false);
        setEditingTask(null);
    }

    async function handleDelete(task) {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${task.title}"?`
        );

        if (!confirmed) {
            return;
        }

        await removeTask(task.id);
    }

    async function handleStatusChange(
        id,
        status
    ) {
        await changeTaskStatus(
            id,
            status
        );
    }

    function clearFilters() {
        setSearch("");
        setStatusFilter("All");
        setPriorityFilter("All");
    }

    return (
        <div className="page">

            <header className="page-header">

                <div>
                    <p className="eyebrow">
                        WORKSPACE
                    </p>

                    <h2>
                        Tasks
                    </h2>

                    <p className="page-description">
                        Create, manage and monitor
                        employee tasks.
                    </p>
                </div>

                <button
                    className="primary-button"
                    type="button"
                    onClick={handleAddTask}
                >
                    + Add Task
                </button>

            </header>

            {error && (
                <div className="api-error">
                    {error}
                </div>
            )}

            <section className="task-controls">

                <div className="search-box">

                    <span>
                        ⌕
                    </span>

                    <input
                        type="search"
                        placeholder="Search tasks by title..."
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                    />

                </div>

                <div className="filter-group">

                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(
                                event.target.value
                            )
                        }
                    >
                        <option value="All">
                            All Statuses
                        </option>

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="In Progress">
                            In Progress
                        </option>

                        <option value="Completed">
                            Completed
                        </option>
                    </select>

                    <select
                        value={priorityFilter}
                        onChange={(event) =>
                            setPriorityFilter(
                                event.target.value
                            )
                        }
                    >
                        <option value="All">
                            All Priorities
                        </option>

                        <option value="Low">
                            Low
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="High">
                            High
                        </option>
                    </select>

                    <button
                        className="clear-filter-button"
                        type="button"
                        onClick={clearFilters}
                    >
                        Clear
                    </button>

                </div>

            </section>

            <div className="task-results-header">

                <div>
                    <strong>
                        All Tasks
                    </strong>

                    <span>
                        {filteredTasks.length} task
                        {filteredTasks.length !== 1
                            ? "s"
                            : ""}
                    </span>
                </div>

            </div>

            <TaskTable
                tasks={filteredTasks}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={
                    handleStatusChange
                }
            />

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingTask(null);
                }}
                onSave={handleSave}
                editingTask={editingTask}
            />

        </div>
    );
}

export default TasksPage;
