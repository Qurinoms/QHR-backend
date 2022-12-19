import express from "express";
import {
  clockIn,
  clockOut,
  deleteAttendance,
  deleteMany,
  getAllTodayAttendance,
  getAttendanceByTwoDate,
  getEmployeeAttendancesByMonths,
  selfAttendance,
} from "../controllers/attendance.js";
import { verifyToken } from "../middleware/verifyToken.js";
const routes = express.Router();

routes.post("/clockIn", clockIn);
routes.put("/clockOut", clockOut);
// routes.post("/takeAttendance", verifyToken, attendance);
routes.post("/selfAttendance", selfAttendance);
// routes.post("/selfAttendance", verifyToken, selfAttendance);
routes.get("/getPerDayAttendance", getAllTodayAttendance);
routes.post("/getByDate", getAttendanceByTwoDate);
routes.post("/getEmpAttnd", getEmployeeAttendancesByMonths);
routes.delete("/attendance/:id", deleteAttendance);
routes.delete("/attendance/user/:id", deleteMany);
export default routes;
