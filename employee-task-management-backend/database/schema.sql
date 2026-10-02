CREATE DATABASE IF NOT EXISTS employee_task_manager;

USE employee_task_manager;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(150) NOT NULL,

    description TEXT,

    priority ENUM('Low', 'Medium', 'High')
        NOT NULL DEFAULT 'Medium',

    status ENUM('Pending', 'In Progress', 'Completed')
        NOT NULL DEFAULT 'Pending',

    due_date DATE NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
