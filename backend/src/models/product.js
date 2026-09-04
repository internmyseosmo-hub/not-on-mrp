import mongoose from "mongoose";

const productColorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        bg: { type: String, trim: true },
    },
    { _id: false }
);

const productSpecificationSchema = new mongoose.Schema(
    {
        label: { type: String, required: true, trim: true },
        value: { type: String, required: true, trim: true },
    },
    { _id: false }
);

const productSchema = new mongoose.Schema(
    {
        id: { type: Number, default: () => Date.now(), unique: true, index: true },
        name: { type: String, required: true, trim: true },
        category: { type: String, required: true, trim: true, index: true },
        image: { type: String, trim: true },
        tagline: { type: String, trim: true },
        price: { type: Number, required: true, min: 0 },
        mrp: { type: Number, required: true, min: 0 },
        discount: { type: Number, default: 0, min: 0, max: 100 },
        rating: { type: Number, default: 4.5, min: 0, max: 5 },
        reviewsCount: { type: Number, default: 0, min: 0 },
        art: { type: String, trim: true },
        inStock: { type: Boolean, default: true },
        isDeal: { type: Boolean, default: false },
        isNewArrival: { type: Boolean, default: false },
        stockCount: { type: Number, default: 0, min: 0 },
        colors: { type: [productColorSchema], default: [] },
        description: { type: String, trim: true },
        highlights: { type: [String], default: [] },
        specifications: { type: [productSpecificationSchema], default: [] },
    },
    { timestamps: true }
);

productSchema.pre("validate", function () {
    if (!this.id) {
        this.id = Date.now();
    }
    if (this.mrp > 0 && this.price <= this.mrp) {
        this.discount = Math.round(((this.mrp - this.price) / this.mrp) * 100);
    }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
