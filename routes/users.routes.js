const express = require("express");

const routes = express.Router();

const { registerUser } = require("../controllers/users.controllers");

routes.post("/", registerUser);

module.exports = routes;
