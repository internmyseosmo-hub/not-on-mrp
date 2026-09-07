import Blog from "../models/blog.js";
import { getImageKit } from "../config/imagekit.js";

const uploadBlogImage = async (file) => {
    if (!file) return undefined;
    const uploaded = await getImageKit().upload({
        file: file.buffer,
        fileName: `${Date.now()}-${file.originalname}`,
        folder: "/blog",
        useUniqueFileName: true,
    });
    return uploaded.url;
};

// GET /api/blog — get all published posts
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/blog/:id — get single post
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/blog — create post
export const createBlog = async (req, res) => {
  try {
    const { title, subtitle, description, content } = req.body;
    let image = req.body.image || "";
    if (req.file) {
      image = await uploadBlogImage(req.file);
    }
    const blog = new Blog({ title, subtitle, description, content, image });
    const saved = await blog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/blog/:id — update post
export const updateBlog = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = await uploadBlogImage(req.file);
    }
    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/blog/:id — delete post
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
