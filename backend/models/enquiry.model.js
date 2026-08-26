const db = require("../database");

function create(enquiry) {
  return db.prepare("INSERT INTO enquiries (user_id, vehicle_id, name, email, phone, message) VALUES (?, ?, ?, ?, ?, ?)").run(enquiry.userId || null, enquiry.vehicleId || null, enquiry.name, enquiry.email, enquiry.phone || null, enquiry.message);
}

function forUser(userId) {
  return db.prepare("SELECT enquiries.*, vehicles.model AS vehicle_model FROM enquiries LEFT JOIN vehicles ON vehicles.id = enquiries.vehicle_id WHERE enquiries.user_id = ? ORDER BY enquiries.created_at DESC").all(userId);
}

module.exports = { create, forUser };