import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createJob, deleteExistingJob, getJobs, updateExistingJob } from "../controllers/job.controller";

const router = express.Router()

router.post("/create",authMiddleware,createJob as any);
router.get("/",getJobs);
router.put("/update/:id",authMiddleware,updateExistingJob as any);
router.delete("/delete/:id",authMiddleware,deleteExistingJob as any);

export default router;