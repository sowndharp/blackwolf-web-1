const jwt = require("jsonwebtoken");

function createToken(user) {
  return jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET || "development_secret_change_me", { expiresIn: "2h" });
}

module.exports = { createToken };