const express = require("express");

const routes = express.Router();

const {
  getAllTasks,
  getTask,
  createNewTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controllers");

routes.get("/", getAllTasks);
routes.get("/:id", getTask);
routes.post("/", createNewTask);
routes.put("/:id", updateTask);
routes.delete("/:id", deleteTask);

module.exports = routes;
