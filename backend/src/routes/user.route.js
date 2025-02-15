import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getCurrentUser,
  getUserReport,
  updateAvatar,
  updateUser,
} from "../controllers/user.controller.js";
import { authorizeRoles, verifyToken } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
const router = Router();
// get all users
router.get("/all", verifyToken, authorizeRoles("ADMIN"), getAllUsers);
// get current user
router.get("/me", verifyToken, getCurrentUser);
// get user report
router.get("/report", verifyToken, getUserReport);

// update user info
router.patch("/update/:id", verifyToken, updateUser);

// update avatar
router.patch("/avatar", verifyToken, upload.single("avatar"), updateAvatar);

// delete user
router.delete("/delete/:id", verifyToken, authorizeRoles("ADMIN"), deleteUser);

export default router;
