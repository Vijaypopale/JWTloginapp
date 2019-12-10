const express = require("express");
const { protect } = require("../middleware/auth");
const { postUser, getUsers, loginUser } = require("../controllers/users");
const route = express.Router();

route.post("/register", postUser);
route.post("/login", loginUser);
route.get("/", protect, getUsers);

module.exports = route;
