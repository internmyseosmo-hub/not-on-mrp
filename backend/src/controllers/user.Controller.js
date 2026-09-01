import User from "../models/user.js";
import { generateToken } from "../middleware/authMiddleware.js";

// @desc    Register a new user
// @route   POST /api/users/register
export const registerUser = async (req, res, next) => {
    try {
        const fullName = req.body.fullName || req.body.name;
        const mobile = req.body.mobile || req.body.phone || null;
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email: email ? email.toLowerCase().trim() : "" });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email address is already registered",
            });
        }

        // Create user
        const user = await User.create({
            fullName,
            email,
            password,
            mobile: mobile && mobile.trim() !== "" ? mobile : null,
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            data: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                mobile: user.mobile,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Login user & get token
// @route   POST /api/users/login
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password",
            });
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            data: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                mobile: user.mobile,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get current user profile (Protected)
// @route   GET /api/users/profile
export const getUserProfile = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            data: req.user,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all users
// @route   GET /api/users
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select("-password").sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update user details
// @route   PUT /api/users/:id
export const updateUser = async (req, res, next) => {
    try {
        const fullName = req.body.fullName || req.body.name;
        const mobile = req.body.mobile || req.body.phone;
        const { email, password } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (password) user.password = password;
        if (mobile !== undefined) user.mobile = mobile;

        await user.save();

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                mobile: user.mobile,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
