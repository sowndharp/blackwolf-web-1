const express = require("express");
const controller = require("../controllers/vehicle.controller");

const router = express.Router();
router.get("/", controller.list);
router.get("/:id", controller.details);

module.exports = router;