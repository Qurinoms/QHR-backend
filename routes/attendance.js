import express from "express";
import { attendance, selfAttendance } from "../controllers/attendance.js";
import { verifyToken } from "../middleware/verifyToken.js";
const routes = express.Router();

routes.post("/takeAttendance", attendance);
// routes.post("/takeAttendance", verifyToken, attendance);
routes.post("/selfAttendance", selfAttendance);
// routes.get("/selfAttendance", verifyToken, selfAttendance);
export default routes;
