import express from "express";
import {
  attendance,
  getAllTodayAttendance,
  getAttendanceByTwoDate,
  getEmployeeAttendancesByMonths,
  selfAttendance,
} from "../controllers/attendance.js";
import { verifyToken } from "../middleware/verifyToken.js";
const routes = express.Router();

routes.post("/takeAttendance", attendance);
// routes.post("/takeAttendance", verifyToken, attendance);
routes.post("/selfAttendance", selfAttendance);
// routes.post("/selfAttendance", verifyToken, selfAttendance);
routes.get("/getPerDayAttendance", getAllTodayAttendance);
routes.post("/getByDate", getAttendanceByTwoDate);
routes.post("/getEmpAttnd", getEmployeeAttendancesByMonths);
export default routes;
