const User = require("../models/UserModel");

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins only!" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = adminMiddleware;
