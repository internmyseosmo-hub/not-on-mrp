import { getImageKit } from "../config/imagekit.js";

// @desc    Generate short-lived credentials for browser-side ImageKit uploads
// @route   GET /api/imagekit/auth
export const getImageKitAuth = (req, res, next) => {
    try {
        const authenticationParameters = getImageKit().getAuthenticationParameters();
        res.status(200).json({
            success: true,
            data: authenticationParameters,
        });
    } catch (error) {
        next(error);
    }
};
