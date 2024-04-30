const {
  getTasks,
  getTasksById,
  createTask,
  updateTasksById,
  deleteTasksById,
} = require("../tasks/database.tasks");

const getAllTasks = async (req, res) => {
  const tasks = await getTasks();
  res.send(tasks);
};

const getTask = async (req, res) => {
  const { id } = req.params;
  const task = await getTasksById(id);
  if (task.length === 0) {
    res.status(200).send(`Given taskId ${id} does not exist in DB`);
  }
  res.send(task);
};

const createNewTask = async (req, res) => {
  const { title, description, assignedTo, status } = req.body;
  const newTask = await createTask(title, description, assignedTo, status);
  console.log("newTask", newTask);
  if (!newTask) {
    res.status(401).send("something wrong when creating user!");
  }
  res.status(201).send(newTask);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, assignedTo, status } = req.body;
  console.log("req.body", title);
  const updatedTask = await updateTasksById(
    parseInt(id),
    title,
    description,
    assignedTo,
    status
  );
  if (!updatedTask) {
    res.status(400).send(`Cannot the update row with taskId ${id}`);
  }
  res.status(201).send(updatedTask);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteTasksById(parseInt(id));

    res.status(200).send("Deleted Task Successfully");
  } catch (err) {
    console.log(`Error while deleting the task with taskId ${id}`);
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createNewTask,
  updateTask,
  deleteTask,
};
