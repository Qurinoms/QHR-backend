import express from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../controllers/employee.js";

const routes = express.Router();

routes.get("/:id", getSingleUser);
routes.get("/", getAllUsers);

routes.put("/:id", updateUser);
routes.delete("/:id", deleteUser);

export default routes;
