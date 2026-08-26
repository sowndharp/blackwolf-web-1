require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./database");
const authRoutes = require("./routes/auth.routes");
const vehicleRoutes = require("./routes/vehicle.routes");
const enquiryRoutes = require("./routes/enquiry.routes");
const userRoutes = require("./routes/user.routes");
const userController = require("./controllers/user.controller");
const { requireAuth } = require("./auth/middleware");

const app = express();
const PORT = process.env.PORT || 5000;
const frontendPath = path.join(__dirname, "..", "frontend");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(frontendPath));

app.get("/api/health", (req, res) => res.json({ success: true, message: "Backend is running" }));
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/user", userRoutes);
app.get("/api/dashboard", requireAuth, userController.dashboard);
app.use("/api", (req, res) => res.status(404).json({ success: false, message: "API endpoint not found" }));
app.use((req, res) => res.sendFile(path.join(frontendPath, "index.html")));

app.listen(PORT, () => console.log(`Blackwolf BMW Showroom running at http://localhost:${PORT}`));

module.exports = { app, db };