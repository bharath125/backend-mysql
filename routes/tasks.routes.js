const express = require("express");

const routes = express.Router();

const {
  getAllTasks,
  getTask,
  createNewTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controllers");

//role based access middleware
const restrict = (...allowedRoles) => {
  return (req, res, next) => {
    const userRoles = req.body.role; // attach user roles to the request object
    console.log("userRoles", userRoles);
    console.log("allowedRoles", allowedRoles);
    if (allowedRoles.includes(userRoles)) {
      next();
    } else {
      res.status(403).json({ message: "Access forbidden" });
    }
  };
};

routes.get("/", restrict("admin", "manager"), getAllTasks);
routes.get("/:id", restrict("admin", "manager"), getTask);
routes.post("/", restrict("admin"), createNewTask);
routes.put("/:id", restrict("admin", "manager"), updateTask);
routes.delete("/:id", restrict("admin"), deleteTask);

// routes.get("/", getAllTasks);
// routes.get("/:id", getTask);
// routes.post("/", createNewTask);
// routes.put("/:id", updateTask);
// routes.delete("/:id", deleteTask);

module.exports = routes;
