const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access Denied. Please log in." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid Token. User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token. Please log in again." });
  }
};

module.exports = authMiddleware;