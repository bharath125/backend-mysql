const express = require("express");

const routes = express.Router();

const { loginUser } = require("../controllers/users.controllers");

routes.post("/", loginUser);

module.exports = routes;
