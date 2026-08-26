const vehicleModel = require("../models/vehicle.model");

function list(req, res) {
  res.json({ success: true, vehicles: vehicleModel.all(req.query) });
}

function details(req, res) {
  const vehicle = vehicleModel.findById(Number(req.params.id));
  if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
  res.json({ success: true, vehicle });
}

module.exports = { list, details };