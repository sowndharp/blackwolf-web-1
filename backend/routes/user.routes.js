const express = require("express");
const controller = require("../controllers/user.controller");
const { requireAuth } = require("../auth/middleware");

const router = express.Router();
router.use(requireAuth);
router.get("/profile", controller.profile);
router.get("/dashboard", controller.dashboard);

module.exports = router;