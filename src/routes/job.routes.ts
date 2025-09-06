import express from "express";
import { createJob, deleteExistingJob, GetAJob, getJobs, getMyJobs, updateExistingJob } from "../controllers/job.controller";
import { authenticationMiddleware } from "../middleware/authenticate.middleware";
import { authorizationMiddleware } from "../middleware/authorize.middleware";

const router = express.Router()

router.post("/create",authenticationMiddleware,authorizationMiddleware(['employer']),createJob as any);
router.get("/",authenticationMiddleware,getJobs);
router.get("/job-detail/:id",authenticationMiddleware,GetAJob as any);
router.get("/myjobs",authenticationMiddleware,authorizationMiddleware(['employer']),getMyJobs as any);
router.put("/update/:id",authenticationMiddleware,authorizationMiddleware(['employer']),updateExistingJob as any);
router.delete("/delete/:id",authenticationMiddleware,authorizationMiddleware(['employer']),deleteExistingJob as any);

export default router;