import express from "express";
import {
  applyCandidate,
  deleteCandidate,
  editCandite,
  getAllCandidates,
  getCandidate,
  searchCndidate,
} from "../controllers/candidate.js";

const routes = express.Router();

routes.post("/", applyCandidate);
routes.get("/", getAllCandidates);
routes.get("/search", searchCndidate);
routes.get("/:id", getCandidate);
routes.put("/:id", editCandite);
routes.delete("/:id", deleteCandidate);

export default routes;
