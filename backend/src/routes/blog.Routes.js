import express from "express";
import { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from "../controllers/blog.Controller.js";
import multer from "multer";

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) return cb(null, true);
        cb(new Error("Only image files are allowed"));
    },
});

router.route("/").get(getBlogs).post(upload.single("image"), createBlog);
router.route("/:id").get(getBlogById).put(upload.single("image"), updateBlog).delete(deleteBlog);

export default router;
