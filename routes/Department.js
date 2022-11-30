import express from "express";
import {
  createDepartments,
  deleteDepartment,
  getAllDepartments,
  updateDepartment,
} from "../controllers/department.js";

const routes = express.Router();

routes.post("/", createDepartments);
routes.get("/", getAllDepartments);
routes.put("/:id", updateDepartment);
routes.delete("/:id", deleteDepartment);

export default routes;
