import { useEffect, useState } from "react";

const initialForm = {
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    dueDate: ""
};

function TaskModal({
    isOpen,
    onClose,
    onSave,
    editingTask
}) {
    const [form, setForm] =
        useState(initialForm);

    const [errors, setErrors] =
        useState({});

    const [saving, setSaving] =
        useState(false);

    useEffect(() => {
        if (editingTask) {
            setForm({
                title: editingTask.title || "",
                description:
                    editingTask.description || "",
                priority:
                    editingTask.priority || "Medium",
                status:
                    editingTask.status || "Pending",
                dueDate:
                    editingTask.dueDate || ""
            });
        } else {
            setForm(initialForm);
        }

        setErrors({});
    }, [editingTask, isOpen]);

    if (!isOpen) {
        return null;
    }

    function handleChange(event) {
        const {
            name,
            value
        } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value
        }));

        setErrors((current) => ({
            ...current,
            [name]: ""
        }));
    }

    function validate() {
        const newErrors = {};

        if (!form.title.trim()) {
            newErrors.title =
                "Task title is required.";
        }

        if (!form.dueDate) {
            newErrors.dueDate =
                "Due date is required.";
        }

        return newErrors;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const validationErrors =
            validate();

        if (
            Object.keys(validationErrors)
                .length > 0
        ) {
            setErrors(validationErrors);
            return;
        }

        try {
            setSaving(true);

            const task = {
                ...form,
                ...(editingTask
                    ? { id: editingTask.id }
                    : {})
            };

            await onSave(task);

            setForm(initialForm);
            setErrors({});
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div
            className="modal-overlay"
            onMouseDown={(event) => {
                if (
                    event.target ===
                    event.currentTarget
                ) {
                    onClose();
                }
            }}
        >

            <div className="modal">

                <div className="modal-header">

                    <div>
                        <p className="eyebrow">
                            TASK MANAGEMENT
                        </p>

                        <h2>
                            {editingTask
                                ? "Edit Task"
                                : "Create New Task"}
                        </h2>
                    </div>

                    <button
                        className="modal-close"
                        type="button"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>

                <form
                    className="task-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label htmlFor="title">
                            Task Title
                            <span>*</span>
                        </label>

                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Enter task title"
                            value={form.title}
                            onChange={handleChange}
                        />

                        {errors.title && (
                            <small className="form-error">
                                {errors.title}
                            </small>
                        )}

                    </div>

                    <div className="form-group">

                        <label htmlFor="description">
                            Description
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            placeholder="Describe the task..."
                            value={
                                form.description
                            }
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-row">

                        <div className="form-group">

                            <label htmlFor="priority">
                                Priority
                            </label>

                            <select
                                id="priority"
                                name="priority"
                                value={
                                    form.priority
                                }
                                onChange={handleChange}
                            >
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

                        </div>

                        <div className="form-group">

                            <label htmlFor="status">
                                Status
                            </label>

                            <select
                                id="status"
                                name="status"
                                value={
                                    form.status
                                }
                                onChange={handleChange}
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

                        </div>

                    </div>

                    <div className="form-group">

                        <label htmlFor="dueDate">
                            Due Date
                            <span>*</span>
                        </label>

                        <input
                            id="dueDate"
                            name="dueDate"
                            type="date"
                            value={
                                form.dueDate
                            }
                            onChange={handleChange}
                        />

                        {errors.dueDate && (
                            <small className="form-error">
                                {errors.dueDate}
                            </small>
                        )}

                    </div>

                    <div className="modal-footer">

                        <button
                            className="secondary-button"
                            type="button"
                            onClick={onClose}
                            disabled={saving}
                        >
                            Cancel
                        </button>

                        <button
                            className="primary-button"
                            type="submit"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : editingTask
                                ? "Update Task"
                                : "Save Task"}
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}

export default TaskModal;
