const allowedPriorities = [
    "Low",
    "Medium",
    "High"
];

const allowedStatuses = [
    "Pending",
    "In Progress",
    "Completed"
];

function validateTask(data) {
    const errors = {};

    // Title validation
    if (!data.title || !data.title.trim()) {
        errors.title = "Task title is required.";
    } else if (data.title.trim().length > 150) {
        errors.title = "Task title cannot exceed 150 characters.";
    }

    // Description validation
    if (data.description && data.description.length > 2000) {
        errors.description = "Description cannot exceed 2000 characters.";
    }

    // Priority validation
    if (!allowedPriorities.includes(data.priority)) {
        errors.priority = "Priority must be Low, Medium, or High.";
    }

    // Status validation
    if (!allowedStatuses.includes(data.status)) {
        errors.status =
            "Status must be Pending, In Progress, or Completed.";
    }

    // Due date validation
    if (!data.dueDate) {
        errors.dueDate = "Due date is required.";
    } else {
        const date = new Date(data.dueDate);

        if (Number.isNaN(date.getTime())) {
            errors.dueDate = "Please provide a valid due date.";
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

function validateStatus(status) {
    if (!allowedStatuses.includes(status)) {
        return {
            isValid: false,
            errors: {
                status:
                    "Status must be Pending, In Progress, or Completed."
            }
        };
    }

    return {
        isValid: true,
        errors: {}
    };
}

module.exports = {
    validateTask,
    validateStatus,
    allowedPriorities,
    allowedStatuses
};
