const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* MongoDB Connection */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));

/* Routes */
app.use("/api/auth", require("./routes/authRoutes"));

/* Server */
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));