import express from "express";
import {
    getProducts,
    getProductById,
    getProductCategories,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/product.Controller.js";
import multer from "multer";

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith("image/")) return callback(null, true);
        callback(new Error("Only image files are allowed"));
    },
});

router.get("/", getProducts);
router.get("/categories", getProductCategories);
router.get("/:id", getProductById);
router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
