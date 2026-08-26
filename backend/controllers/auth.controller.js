const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const { createToken } = require("../utils/jwt");
const { isValidEmail, required } = require("../utils/validation");

async function register(req, res) {
  const { name, email, password } = req.body;
  if (!required(name) || !isValidEmail(email || "") || !required(password)) return res.status(400).json({ success: false, message: "Name, valid email and password are required" });
  if (password.length < 6) return res.status(400).json({ success: false, message: "Password must contain at least 6 characters" });
  const normalizedEmail = email.trim().toLowerCase();
  if (userModel.findByEmail(normalizedEmail)) return res.status(409).json({ success: false, message: "Email is already registered" });
  const result = userModel.create(name.trim(), normalizedEmail, await bcrypt.hash(password, 12));
  res.status(201).json({ success: true, message: "Account created successfully", userId: result.lastInsertRowid });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = email && userModel.findByEmail(email.trim().toLowerCase());
  if (!user || !(await bcrypt.compare(password || "", user.password))) return res.status(401).json({ success: false, message: "Invalid email or password" });
  res.json({ success: true, message: "Login successful", token: createToken(user), user: { id: user.id, name: user.name, email: user.email } });
}

function me(req, res) {
  const user = userModel.findPublicById(req.user.id);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  res.json({ success: true, user });
}

module.exports = { register, login, me };