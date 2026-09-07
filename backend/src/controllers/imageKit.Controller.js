import { getImageKit } from "../config/imagekit.js";

// @desc    Generate short-lived credentials for browser-side ImageKit uploads
// @route   GET /api/imagekit/auth
export const getImageKitAuth = (req, res, next) => {
    try {
        const ik = getImageKit();
        const authenticationParameters = ik.getAuthenticationParameters();
        res.status(200).json({
            success: true,
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
            data: authenticationParameters,
        });
    } catch (error) {
        next(error);
    }
};
