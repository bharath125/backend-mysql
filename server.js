const express = require("express");

const app = express();

const tasksRoutes = require("./routes/tasks.routes");

//middleware for json
app.use(express.json());

//routes to tasks
app.use("/tasks", tasksRoutes);

app.listen(3000, () => console.log("Server running at port 3000"));
