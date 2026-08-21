import express from "express";
import { getImageKitAuth } from "../controllers/imageKit.Controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/auth", protect, getImageKitAuth);

export default router;
