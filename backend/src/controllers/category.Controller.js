import Category from "../models/category.js";
import Product from "../models/product.js";
import { getImageKit } from "../config/imagekit.js";

const toBoolean = (value, fallback = true) => {
    if (value === undefined) return fallback;
    return value === true || value === "true";
};

const uploadCategoryImage = async (file) => {
    if (!file) return undefined;

    const uploadedFile = await getImageKit().upload({
        file: file.buffer,
        fileName: `${Date.now()}-${file.originalname}`,
        folder: "/categories",
        useUniqueFileName: true,
    });

    return uploadedFile.url;
};

const addProductCounts = async (categories) => {
    const counts = await Product.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    const countMap = new Map(counts.map(({ _id, count }) => [_id, count]));
    return categories.map((category) => ({
        ...category.toObject(),
        productCount: countMap.get(category.name) || 0,
    }));
};

// @desc    Get active categories for the storefront
// @route   GET /api/categories
export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({ isActive: true }).sort({ sortOrder: 1, name: 1 });
        res.status(200).json({
            success: true,
            count: categories.length,
            data: await addProductCounts(categories),
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all categories for management
// @route   GET /api/categories/all
export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find().sort({ sortOrder: 1, name: 1 });
        res.status(200).json({
            success: true,
            count: categories.length,
            data: await addProductCounts(categories),
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create a category
// @route   POST /api/categories
export const createCategory = async (req, res, next) => {
    try {
        const name = req.body.name?.trim();
        if (!name) return res.status(400).json({ success: false, message: "Category name is required" });

        const image = await uploadCategoryImage(req.file);
        const category = await Category.create({
            name,
            description: req.body.description,
            image,
            isActive: toBoolean(req.body.isActive),
            sortOrder: Number(req.body.sortOrder) || 0,
        });

        res.status(201).json({ success: true, data: { ...category.toObject(), productCount: 0 } });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
export const updateCategory = async (req, res, next) => {
    try {
        const updateData = { ...req.body };
        if (updateData.name) updateData.name = updateData.name.trim();
        if (updateData.isActive !== undefined) updateData.isActive = toBoolean(updateData.isActive);
        if (updateData.sortOrder !== undefined) updateData.sortOrder = Number(updateData.sortOrder);

        const image = await uploadCategoryImage(req.file);
        if (image) updateData.image = image;

        const category = await Category.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!category) return res.status(404).json({ success: false, message: "Category not found" });

        res.status(200).json({ success: true, data: (await addProductCounts([category]))[0] });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
export const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ success: false, message: "Category not found" });

        const productsUsingCategory = await Product.countDocuments({ category: category.name });
        if (productsUsingCategory > 0) {
            return res.status(409).json({
                success: false,
                message: "Category has products. Deactivate it instead of deleting it.",
            });
        }

        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        next(error);
    }
};
