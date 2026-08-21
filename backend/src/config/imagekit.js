import ImageKit from "imagekit";

let imageKit;

export const getImageKit = () => {
    if (!imageKit) {
        const { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT } = process.env;

        if (!IMAGEKIT_PUBLIC_KEY || !IMAGEKIT_PRIVATE_KEY || !IMAGEKIT_URL_ENDPOINT) {
            const missing = [
                ["IMAGEKIT_PUBLIC_KEY", IMAGEKIT_PUBLIC_KEY],
                ["IMAGEKIT_PRIVATE_KEY", IMAGEKIT_PRIVATE_KEY],
                ["IMAGEKIT_URL_ENDPOINT", IMAGEKIT_URL_ENDPOINT],
            ]
                .filter(([, value]) => !value)
                .map(([name]) => name)
                .join(", ");

            throw new Error(`Missing ImageKit environment variable(s): ${missing}`);
        }

        imageKit = new ImageKit({
            publicKey: IMAGEKIT_PUBLIC_KEY,
            privateKey: IMAGEKIT_PRIVATE_KEY,
            urlEndpoint: IMAGEKIT_URL_ENDPOINT,
        });
    }

    return imageKit;
};
