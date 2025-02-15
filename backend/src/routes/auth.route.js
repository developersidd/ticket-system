import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller.js";
import upload from "../middleware/multer.middleware.js";
const router = Router();

router.post("/login", loginUser);
router.post("/register", upload.single("avatar"), registerUser);
router.post("/logout", logoutUser);

export default router;
