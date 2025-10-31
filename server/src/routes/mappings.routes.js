import express from "express";
import {
  addMapping,
  getMappings,
  getDoctorAssigned,
  deleteAssignedDoctor,
} from "../controllers/mapping.controller.js";
import { protectedRoute } from "../middlewares/protectedRoute.middleware.js";
const router = express.Router();

router.post("/", protectedRoute, addMapping);
router.get("/", protectedRoute, getMappings);
router.get("/:patientId", protectedRoute, getDoctorAssigned);
router.delete("/:patientId/:doctorId", protectedRoute, deleteAssignedDoctor);

export default router;
