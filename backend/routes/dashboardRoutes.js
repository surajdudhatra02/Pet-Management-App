const express = require("express");
const { getAllUsers } = require("../controllers/dashboardController");
const { userDashboardController } = require("../controllers/userDashboardController")
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const { petAdmissionController } = require("../controllers/petAdmissionController")

const router = express.Router();

router.get("/admin", authMiddleware, adminMiddleware, getAllUsers);
router.post("/admin/petform", authMiddleware, petAdmissionController);

router.get("/user", authMiddleware, userDashboardController);

module.exports = router;