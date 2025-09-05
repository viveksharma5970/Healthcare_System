import express from "express";
import { protectedRoute } from "../middlewares/protectedRoute.middleware.js";
import { addPatient, getPatients, getSpecificPatient, updatePatient, deletePatient } from "../controllers/patient.controller.js";

const router = express.Router();

router.post("/",protectedRoute, addPatient);
router.get("/", protectedRoute, getPatients);
router.get("/:id", getSpecificPatient);
router.put("/:id", protectedRoute, updatePatient);
router.delete("/:id", protectedRoute, deletePatient);

export default router;