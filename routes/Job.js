import express from "express";
import {
  deleteJobs,
  editJobs,
  getAllJob,
  getJob,
  postJobs,
  searchJobs,
} from "../controllers/Jobs.js";

const routes = express.Router();

routes.post("/", postJobs);
routes.put("/:id", editJobs);
routes.get("/search", searchJobs);
routes.delete("/:id", deleteJobs);
routes.get("/:id", getJob);
routes.get("/", getAllJob);

export default routes;
