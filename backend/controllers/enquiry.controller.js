const enquiryModel = require("../models/enquiry.model");
const vehicleModel = require("../models/vehicle.model");
const { required, isValidEmail } = require("../utils/validation");

function create(req, res) {
  const { name, email, phone, message, vehicleId } = req.body;
  if (!required(name) || !isValidEmail(email || "") || !required(message)) return res.status(400).json({ success: false, message: "Name, valid email and message are required" });
  if (vehicleId && !vehicleModel.findById(Number(vehicleId))) return res.status(404).json({ success: false, message: "Vehicle not found" });
  const result = enquiryModel.create({ userId: req.user && req.user.id, vehicleId: vehicleId ? Number(vehicleId) : null, name: name.trim(), email: email.trim().toLowerCase(), phone, message: message.trim() });
  res.status(201).json({ success: true, message: "Enquiry submitted successfully", enquiryId: result.lastInsertRowid });
}

function listMine(req, res) {
  res.json({ success: true, enquiries: enquiryModel.forUser(req.user.id) });
}

module.exports = { create, listMine };