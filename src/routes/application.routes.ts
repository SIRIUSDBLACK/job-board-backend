import express from "express";
import { authorizationMiddleware } from "../middleware/authorize.middleware";
import { authenticationMiddleware } from "../middleware/authenticate.middleware";
import upload from "../middleware/upload";
import { applyCV,  getJobApplications,  getSeekerApplications, updateApplicationStatus } from "../controllers/application.controller";

const router =express.Router()

// router.post("/apply",authenticationMiddleware,authorizationMiddleware(['seeker']),upload.single("cv_file"),applyCV)
router.post("/apply", authenticationMiddleware, authorizationMiddleware(["seeker"]), upload.single("cv_file"), applyCV);

router.get("/get-seeker-applications",authenticationMiddleware,authorizationMiddleware(['seeker']),getSeekerApplications as any)
router.get("/get-job-applications/:id",authenticationMiddleware,authorizationMiddleware(['employer']),getJobApplications)
router.patch("/change-status/:id",authenticationMiddleware,authorizationMiddleware(['employer']),updateApplicationStatus)

export default router ;