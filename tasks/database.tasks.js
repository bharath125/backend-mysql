const mysql = require("mysql2/promise");

require("dotenv").config();

//creating a connectionpool to connect with database value getting from .env file
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

async function getTasks() {
  const query = "SELECT * FROM tasks";
  const [rows] = await pool.query(query);
  try {
    const tasks = await rows;
    return tasks;
  } catch (err) {
    console.log("Error while fetching users from database:", err);
  }
}

async function getTasksById(taskId) {
  const query = `
  SELECT * from tasks WHERE taskId=?
  `;
  const [rows] = await pool.query(query, [taskId]);
  try {
    const task = await rows;
    // console.log("user", user);
    return task;
  } catch (err) {
    console.log(`Error while fetching user for ${id}: ${err}`);
  }
}

async function createTask(title, description, assignedTo, status) {
  const query = `
  INSERT INTO tasks (title, description, assignedTo, status)
  VALUES (?,?,?,?)
  `;
  const [rows] = await pool.query(query, [
    title,
    description,
    assignedTo,
    status,
  ]);
  try {
    const tasks = await rows;
    // console.log("insertId", users.insertId);
    return getTasksById(tasks.insertId);
  } catch (err) {
    console.log("Error while fetching users from database:", err);
  }
}

async function updateTasksById(taskId, title, description, assignedTo, status) {
  const query = `
  UPDATE tasks SET title='${title}',description='${description}',assignedTo='${assignedTo}',status='${status}' WHERE taskId=?
  `;
  const [rows] = await pool.query(query, [taskId]);
  try {
    const task = await rows;
    console.log("task", task);
    return getTasksById(taskId);
  } catch (err) {
    console.log(`Error while fetching user for ${id}: ${err}`);
  }
}

async function deleteTasksById(taskId) {
  const query = `
  DELETE FROM tasks WHERE taskId=?
  `;
  const [rows] = await pool.query(query, [taskId]);
  try {
    await rows;
    // console.log("user", user);
    // return getTasksById(task);
  } catch (err) {
    console.log(`Error while deleting user for ${id}: ${err}`);
  }
}

// async () => {};
// createTask(
//   "todo task",
//   "tracking the tasks and their status",
//   "bharath",
//   "pending"
// );
module.exports = {
  getTasks,
  getTasksById,
  createTask,
  updateTasksById,
  deleteTasksById,
};
