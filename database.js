const mysql = require("mysql2/promise");

require("dotenv").config();

//creating a connectionpool to connect with database value getting from .env file
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

async function getUsers() {
  const query = "SELECT * FROM Users";
  const [rows] = await pool.query(query);
  try {
    const users = await rows;
    return users;
  } catch (err) {
    console.log("Error while fetching users from database:", err);
  }
}

async function getUserById(userId) {
  const query = `
  SELECT * from Users WHERE userId=?
  `;
  const [rows] = await pool.query(query, [userId]);
  try {
    const user = await rows;
    // console.log("user", user);
    return user;
  } catch (err) {
    console.log(`Error while fetching user for ${id}: ${err}`);
  }
}

async function createUser(user, password) {
  const query = `
  INSERT INTO Users (username,password_hash)
  VALUES (?,?)
  `;
  const [rows] = await pool.query(query, [user, password]);
  try {
    const users = await rows;
    // console.log("insertId", users.insertId);
    return getUserById(users.insertId);
  } catch (err) {
    console.log("Error while fetching users from database:", err);
  }
}

// async () => {};
// getUsers();
// createUser("test", "test");
module.exports = { getUsers, getUserById, createUser };
