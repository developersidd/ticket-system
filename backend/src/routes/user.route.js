import { Router } from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/me", verifyToken, getCurrentUser);

export default router;
