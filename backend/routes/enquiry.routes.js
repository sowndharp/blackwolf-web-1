const express = require("express");
const controller = require("../controllers/enquiry.controller");
const { requireAuth } = require("../auth/middleware");

const router = express.Router();
router.post("/", controller.create);
router.get("/mine", requireAuth, controller.listMine);

module.exports = router;