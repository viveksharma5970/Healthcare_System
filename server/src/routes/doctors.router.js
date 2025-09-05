import express from "express";
import { protectedRoute } from "../middlewares/protectedRoute.middleware.js";
import { addDoctor,getDoctors, getSpecificDoctor, updateDoctor, deleteDoctor } from "../controllers/doctor.controller.js";

const router = express.Router();

router.post("/",protectedRoute, addDoctor);
router.get("/",protectedRoute, getDoctors);
router.get("/:id",protectedRoute, getSpecificDoctor);
router.put("/:id", protectedRoute, updateDoctor);
router.delete("/:id", protectedRoute, deleteDoctor);

export default router;