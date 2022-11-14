import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dorEnv from "dotenv";
const app = express();
import authRoutes from "./routes/auth.js";
import attendanceRoutes from "./routes/attendance.js";
import cookieParser from "cookie-parser";
dorEnv.config();
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect database

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected.....");
  } catch (error) {
    console.log(error);
  }
};

// Routes
app.use("/api/employee", authRoutes);
app.use("/api/employee", attendanceRoutes);

const PORT = process.env.PORT || 5000;
const Start = async () => {
  connectDB();
  app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

Start();
