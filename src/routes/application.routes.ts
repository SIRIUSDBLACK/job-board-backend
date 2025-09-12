import express from "express";
import { applyCV, getMyApplications } from "../controllers/application.controller";
import { authorizationMiddleware } from "../middleware/authorize.middleware";
import { authenticationMiddleware } from "../middleware/authenticate.middleware";
import upload from "../middleware/upload";

const router =express.Router()

// router.post("/apply",authenticationMiddleware,authorizationMiddleware(['seeker']),upload.single("cv_file"),applyCV)
router.post("/apply", authenticationMiddleware, authorizationMiddleware(["seeker"]), upload.single("cv_file"), applyCV);

router.get("/get-applications",authenticationMiddleware,authorizationMiddleware(['seeker']),getMyApplications as any)

export default router ;