function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function required(value) {
  return typeof value === "string" && value.trim().length > 0;
}

module.exports = { isValidEmail, required };