const db = require("../database");

function all(filters = {}) {
  let query = "SELECT * FROM vehicles";
  const values = [];
  if (filters.series) {
    query += " WHERE series = ?";
    values.push(filters.series);
  }
  query += " ORDER BY featured DESC, id ASC";
  return db.prepare(query).all(...values);
}

function findById(id) {
  return db.prepare("SELECT * FROM vehicles WHERE id = ?").get(id);
}

module.exports = { all, findById };