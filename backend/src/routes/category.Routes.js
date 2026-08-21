import express from "express";
import multer from "multer";
import {
    getCategories,
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/category.Controller.js";

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith("image/")) return callback(null, true);
        callback(new Error("Only image files are allowed"));
    },
});

router.get("/", getCategories);
router.get("/all", getAllCategories);
router.post("/", upload.single("image"), createCategory);
router.put("/:id", upload.single("image"), updateCategory);
router.delete("/:id", deleteCategory);

export default router;
