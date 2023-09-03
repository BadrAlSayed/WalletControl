const express = require("express");
const userController = require("../controllers/users");
const router = express.Router();

router.get("/", userController.getUsers);
router.post("/", userController.createUser);
router.patch("/:id", userController.updateUser);

module.exports = router;
