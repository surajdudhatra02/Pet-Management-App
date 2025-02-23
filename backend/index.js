const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js");

dotenv.config();
const app = express();

// CORS configuration with the correct URL
const corsOptions = {
  origin: 'https://pet-management-app.vercel.app', // Use full URL (with https://)
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); // Use this configuration for handling CORS

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
