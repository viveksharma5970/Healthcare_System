import express from "express";
import {login, signup, checkAuth, logout} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/protectedRoute.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup",signup);
router.post("/logout", logout);
router.get("/",protectedRoute, checkAuth);

export default router;