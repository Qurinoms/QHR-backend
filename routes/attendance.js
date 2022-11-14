import express from "express";
import { attendance } from "../controllers/attendance.js";
import { verifyToken } from "../middleware/verifyToken.js";
const routes = express.Router();

routes.post("/takeAttendance", verifyToken, attendance);

export default routes;
