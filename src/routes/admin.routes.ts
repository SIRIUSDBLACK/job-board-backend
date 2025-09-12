import express from "express"
import { authenticationMiddleware } from "../middleware/authenticate.middleware";
import { authorizationMiddleware } from "../middleware/authorize.middleware";
import { banUser, changeUserRole, deleteUser, getAllStats, getAllUsers } from "../controllers/admin.controller";


const router = express.Router()

router.get("/get-stats",authenticationMiddleware ,authorizationMiddleware(["admin"]),getAllStats);
router.get("/get-users",authenticationMiddleware ,authorizationMiddleware(["admin"]),getAllUsers);
router.put("/user/role/:id",authenticationMiddleware ,authorizationMiddleware(["admin"]),changeUserRole);
router.put("/user/ban/:id",authenticationMiddleware ,authorizationMiddleware(["admin"]),banUser);
router.delete("/user/delete/:id",authenticationMiddleware ,authorizationMiddleware(["admin"]),deleteUser);

export default router