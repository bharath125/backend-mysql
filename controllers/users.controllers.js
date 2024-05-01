const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const { getUserByUserName, createUser } = require("../users/database.users");

const registerUser = async (req, res) => {
  const { username, password_hash, role } = req.body;
  const hashedPassword = await bcrypt.hash(password_hash, 10);
  const user = await getUserByUserName(username);
  //   console.log("hashedPassword", hashedPassword);
  //   console.log("user", user);
  if (user.length === 0) {
    const newUser = await createUser(username, hashedPassword, role);
    res.status(201).send("User created successfully");
    return newUser;
  } else {
    res.status(400).send("User already Exists!");
  }
};

const loginUser = async (req, res) => {
  const { username, password_hash } = req.body;
  const user = await getUserByUserName(username);
  if (user.length === 0) {
    res.status(400).send("Invalid User");
  } else {
    const isPasswordMatched = await bcrypt.compare(
      password_hash,
      user[0].password_hash
    );
    console.log("isPasswordMatched", isPasswordMatched);
    if (isPasswordMatched) {
      const payload = { username: username };
      const jwtToken = jwt.sign(payload, process.env.SECRET_KEY);
      console.log("jwtToken", jwtToken);

      res.status(200).send({ jwtToken });
    } else {
      res.status(400).send("Invalid Password");
    }
  }
};

module.exports = { registerUser, loginUser };
