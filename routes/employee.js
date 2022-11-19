import express from "express";
import { getEmployeeData } from "../controllers/employee.js";

const routes = express.Router();

routes.get("/employee", getEmployeeData);

export default routes;
