import express from "express";
import {
  forgetPassword,
  googleAuth,
  resetPassword,
  signIn,
  signUp,
} from "../controllers/auth.js";

const routes = express.Router();

routes.post("/google", googleAuth);
routes.post("/signup", signUp);
routes.post("/signin", signIn);
routes.post("/forgetpassword", forgetPassword);
routes.put("/resetpassword/:resetToken", resetPassword);

export default routes;
