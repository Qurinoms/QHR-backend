import express from "express";
import { attendance, selfAttendance } from "../controllers/attendance.js";
import { verifyToken } from "../middleware/verifyToken.js";
const routes = express.Router();

routes.post("/takeAttendance", verifyToken, attendance);
routes.get("/todayAttendance", verifyToken, selfAttendance);
export default routes;
