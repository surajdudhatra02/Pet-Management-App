const express = require("express");
const { signup, login } = require("../controllers/authController.js");
const { validateSignup } = require("../middlewares/validateSignUp.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js");

const router = express.Router();

// router.post("/signup", validateSignup, signup);
router.post("/login", login)

module.exports = router;
