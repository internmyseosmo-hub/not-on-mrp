import jwt from "jsonwebtoken";

// @desc    Admin login
// @route   POST /api/admin/login
export const adminLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const validUsername = process.env.ADMIN_USER || 'admin';
        const validPassword = process.env.ADMIN_PASSWORD || 'admin123';

        if (username === validUsername && password === validPassword) {
            // Generate admin token
            const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || "default_secret", {
                expiresIn: "30d",
            });

            return res.status(200).json({
                success: true,
                message: "Admin login successful",
                token,
                user: {
                    username,
                    role: 'admin'
                }
            });
        }

        return res.status(401).json({
            success: false,
            message: "Invalid admin credentials",
        });
    } catch (error) {
        next(error);
    }
};
