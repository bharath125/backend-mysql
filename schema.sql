--create user table
CREATE TABLE users(
    userId INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password_hash TEXT NOT NULL,
    role ENUM('admin','manager','user') DEFAULT 'user',
)

--create tasks table
CREATE TABLE tasks(
    taskId INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    assignedTo INT,
    status ENUM('pending','completed') DEFAULT 'pending',
    created_at DATETIME, updated_at DATETIME,
    FOREIGN KEY (assignedTo) REFERENCES Users(userId)
)