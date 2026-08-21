import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            unique: true,
            trim: true,
            maxlength: [80, "Category name cannot exceed 80 characters"],
        },
        description: { type: String, trim: true, maxlength: 300 },
        image: { type: String, trim: true },
        isActive: { type: Boolean, default: true },
        sortOrder: { type: Number, default: 0, min: 0 },
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
