import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dorEnv from "dotenv";
const app = express();
import authRoutes from "./routes/auth.js";
import attendanceRoutes from "./routes/attendance.js";
import employeeRoutes from "./routes/employee.js";
import departmentRoutes from "./routes/Department.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import jobRoutes from "./routes/Job.js";
import newsRoutes from "./routes/news.js";
import cookieParser from "cookie-parser";
import leaveRoutes from "./routes/leave.js";
dorEnv.config();
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect database

const connectDatabase = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("DataBase connected");
  } catch (error) {
    console.log(error);
  }
};

// Routes
app.use("/api/employee", authRoutes);
app.use("/api/employee", attendanceRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/news", newsRoutes);
const PORT = process.env.PORT || 5001;
const StartServer = () => {
  connectDatabase(process.env.MONGO_URI);
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
};

StartServer();
