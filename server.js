const express = require("express");

const jwt = require("jsonwebtoken");

const app = express();

const tasksRoutes = require("./routes/tasks.routes");

const usersRoutes = require("./routes/users.routes");

const loginRoutes = require("./routes/login.routes");

require("dotenv").config();

//middleware for json
app.use(express.json());

//authentication middleware
const authenticationToken = (req, res, next) => {
  let jwtToken;
  const authHeader = req.headers["authorization"];
  console.log("authHeader in server.js", authHeader);
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    res.status(401).send("Invalid Token");
  } else {
    jwt.verify(jwtToken, process.env.SECRET_KEY, async (error, payload) => {
      if (error) {
        res.status(401).send("Invalid JWT Token");
      } else {
        next();
      }
    });
  }
};

//routes for tasks
app.use("/tasks", authenticationToken, tasksRoutes);

//routes for register users
app.use("/users", usersRoutes);

//routes for login
app.use("/login", loginRoutes);

app.listen(3000, () => console.log("Server running at port 3000"));
