const db = require("../database");

function findByEmail(email) {
  return db.prepare("SELECT id, name, email, password FROM users WHERE email = ?").get(email);
}

function findPublicById(id) {
  return db.prepare("SELECT id, name, email, created_at FROM users WHERE id = ?").get(id);
}

function create(name, email, password) {
  return db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)").run(name, email, password);
}

function count() {
  return db.prepare("SELECT COUNT(*) AS count FROM users").get().count;
}

module.exports = { findByEmail, findPublicById, create, count };