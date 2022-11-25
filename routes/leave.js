import express from "express";
import {
  applyLeave,
  deleteLeave,
  getAllLeave,
  getLeveByStatus,
  getSpecificLeave,
  updateLeave,
} from "../controllers/leave.js";

const routes = express.Router();

routes.post("/apply", applyLeave);
routes.put("/:id", updateLeave);
routes.delete("/:id", deleteLeave);
routes.get("/:id", getSpecificLeave);
routes.get("/status/:status", getLeveByStatus);
routes.get("/user/:userId", getAllLeave);
export default routes;
