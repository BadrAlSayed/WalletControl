const express = require("express");
const adminController = require("../controllers/admins");
const router = express.Router();

router.post("/register", adminController.register);
router.post("/checkAdmin", adminController.checkAdmin);

module.exports = router;
