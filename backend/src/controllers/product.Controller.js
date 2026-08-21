import Product from "../models/product.js";
import { getImageKit } from "../config/imagekit.js";

const parseField = (value, fallback) => {
    if (value === undefined || value === "") return fallback;
    if (typeof value !== "string") return value;
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
};

const normalizeProductBody = (body) => ({
    ...body,
    id: body.id === undefined ? body.id : Number(body.id),
    price: body.price === undefined ? body.price : Number(body.price),
    mrp: body.mrp === undefined ? body.mrp : Number(body.mrp),
    discount: body.discount === undefined ? body.discount : Number(body.discount),
    rating: body.rating === undefined ? body.rating : Number(body.rating),
    reviewsCount: body.reviewsCount === undefined ? body.reviewsCount : Number(body.reviewsCount),
    stockCount: body.stockCount === undefined ? body.stockCount : Number(body.stockCount),
    inStock: body.inStock === undefined ? body.inStock : body.inStock === true || body.inStock === "true",
    colors: parseField(body.colors, []),
    highlights: parseField(body.highlights, []),
    specifications: parseField(body.specifications, []),
});

const uploadProductImage = async (file) => {
    if (!file) return undefined;

    const uploadedFile = await getImageKit().upload({
        file: file.buffer,
        fileName: `${Date.now()}-${file.originalname}`,
        folder: "/products",
        useUniqueFileName: true,
    });

    return uploadedFile.url;
};

const getNumber = (value) => {
    if (value === undefined || value === "") return undefined;
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
};

// @desc    Get products with optional catalog filters
// @route   GET /api/products
export const getProducts = async (req, res, next) => {
    try {
        const { search, category, sort = "popular" } = req.query;
        const minPrice = getNumber(req.query.minPrice);
        const maxPrice = getNumber(req.query.maxPrice);
        const minRating = getNumber(req.query.minRating);
        const page = Math.max(getNumber(req.query.page) || 1, 1);
        const limit = Math.min(Math.max(getNumber(req.query.limit) || 24, 1), 100);

        if ([minPrice, maxPrice, minRating].includes(null)) {
            return res.status(400).json({ success: false, message: "Price and rating filters must be numbers" });
        }

        const filter = {};
        if (search?.trim()) {
            filter.$or = [
                { name: { $regex: search.trim(), $options: "i" } },
                { category: { $regex: search.trim(), $options: "i" } },
                { tagline: { $regex: search.trim(), $options: "i" } },
                { highlights: { $regex: search.trim(), $options: "i" } },
            ];
        }
        if (category && category !== "All") filter.category = category;
        if (minPrice !== undefined || maxPrice !== undefined) {
            filter.price = {};
            if (minPrice !== undefined) filter.price.$gte = minPrice;
            if (maxPrice !== undefined) filter.price.$lte = maxPrice;
        }
        if (minRating !== undefined) filter.rating = { $gte: minRating };

        const sortMap = {
            popular: { reviewsCount: -1 },
            priceLow: { price: 1 },
            priceHigh: { price: -1 },
            rating: { rating: -1 },
            newest: { createdAt: -1 },
        };
        const [products, total] = await Promise.all([
            Product.find(filter)
                .sort(sortMap[sort] || sortMap.popular)
                .skip((page - 1) * limit)
                .limit(limit),
            Product.countDocuments(filter),
        ]);

        res.status(200).json({
            success: true,
            count: products.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: products,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get one product
// @route   GET /api/products/:id
export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findOne({ id: Number(req.params.id) });
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

// @desc    Get product categories with item counts
// @route   GET /api/products/categories
export const getProductCategories = async (req, res, next) => {
    try {
        const categories = await Product.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } },
            { $project: { _id: 0, name: "$_id", count: 1 } },
            { $sort: { name: 1 } },
        ]);
        res.status(200).json({ success: true, count: categories.length, data: categories });
    } catch (error) {
        next(error);
    }
};

// @desc    Create a product
// @route   POST /api/products
export const createProduct = async (req, res, next) => {
    try {
        const productData = normalizeProductBody(req.body);
        const imageUrl = await uploadProductImage(req.file);
        if (imageUrl) productData.image = imageUrl;

        const product = await Product.create(productData);
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
export const updateProduct = async (req, res, next) => {
    try {
        const updateData = normalizeProductBody(req.body);
        const imageUrl = await uploadProductImage(req.file);
        if (imageUrl) updateData.image = imageUrl;

        const product = await Product.findOneAndUpdate(
            { id: Number(req.params.id) },
            updateData,
            { new: true, runValidators: true }
        );
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findOneAndDelete({ id: Number(req.params.id) });
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        next(error);
    }
};
