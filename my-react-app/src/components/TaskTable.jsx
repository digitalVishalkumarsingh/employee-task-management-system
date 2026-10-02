function TaskTable({
    tasks,
    loading,
    onEdit,
    onDelete,
    onStatusChange
}) {
    if (loading) {
        return (
            <div className="table-state">
                <div className="spinner"></div>

                <p>
                    Loading tasks...
                </p>
            </div>
        );
    }

    if (!tasks || tasks.length === 0) {
        return (
            <div className="table-state empty-state">
                <div className="empty-icon">
                    ✓
                </div>

                <h3>
                    No tasks found
                </h3>

                <p>
                    Try changing your filters or
                    create a new task.
                </p>
            </div>
        );
    }

    return (
        <div className="task-table-wrapper">

            <table className="task-table">

                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {tasks.map((task) => (
                        <tr key={task.id}>

                            <td>
                                <div className="task-title-cell">

                                    <strong>
                                        {task.title}
                                    </strong>

                                    {task.description && (
                                        <span>
                                            {task.description}
                                        </span>
                                    )}

                                </div>
                            </td>

                            <td>
                                <span
                                    className={`priority-badge priority-${task.priority
                                        .toLowerCase()
                                        .replace(
                                            " ",
                                            "-"
                                        )}`}
                                >
                                    {task.priority}
                                </span>
                            </td>

                            <td>
                                <select
                                    className={`status-select status-${task.status
                                        .toLowerCase()
                                        .replace(
                                            " ",
                                            "-"
                                        )}`}
                                    value={task.status}
                                    onChange={(event) =>
                                        onStatusChange(
                                            task.id,
                                            event.target.value
                                        )
                                    }
                                >
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
                            </td>

                            <td>
                                <span className="due-date">
                                    {task.dueDate}
                                </span>
                            </td>

                            <td>
                                <div className="action-buttons">

                                    <button
                                        className="table-action edit"
                                        type="button"
                                        onClick={() =>
                                            onEdit(task)
                                        }
                                        title="Edit task"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="table-action delete"
                                        type="button"
                                        onClick={() =>
                                            onDelete(task)
                                        }
                                        title="Delete task"
                                    >
                                        Delete
                                    </button>

                                </div>
                            </td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default TaskTable;
