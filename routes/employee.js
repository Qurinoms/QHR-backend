import express from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  searchEmplloyee,
  updateUser,
} from "../controllers/employee.js";

const routes = express.Router();

routes.get("/search", searchEmplloyee);
routes.get("/:id", getSingleUser);
routes.get("/", getAllUsers);

routes.put("/:id", updateUser);
routes.delete("/:id", deleteUser);
export default routes;
