const userModel = require("../models/user.model");
const enquiryModel = require("../models/enquiry.model");

function profile(req, res) {
  const user = userModel.findPublicById(req.user.id);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  res.json({ success: true, user });
}

function dashboard(req, res) {
  res.json({ success: true, stats: { users: userModel.count(), vehicles: require("../database").prepare("SELECT COUNT(*) AS count FROM vehicles").get().count, enquiries: enquiryModel.forUser(req.user.id).length, status: "Online", server: "Node.js + Express", database: "SQLite" } });
}

module.exports = { profile, dashboard };