import express from "express";
import {
  createNews,
  deleteNews,
  getAllNews,
  getSingleNews,
  updateNews,
} from "../controllers/news.js";

const routes = express.Router();

routes.post("/", createNews);
routes.put("/:id", updateNews);
routes.delete("/:id", deleteNews);
routes.get("/:id", getSingleNews);
routes.get("/", getAllNews);

export default routes;
