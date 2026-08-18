import express from "express";
import {
    registerUser,
    loginUser,
    getUsers,
    getUserById,
    getUserProfile,
    updateUser,
    deleteUser,
} from "../controllers/user.Controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes (Requires Bearer Token)
router.get("/profile", protect, getUserProfile);

// Admin / User Management routes
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

export default router;
