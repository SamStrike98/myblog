import { v2 as cloudinary } from 'cloudinary';

export async function uploadToCloudinary(src, alt) {

    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
            src, {
            public_id: alt,
        }
        )
        .catch((error) => {
            console.log(error);
        });

    console.log(uploadResult);

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url(alt, {
        fetch_format: 'auto',
        quality: 'auto'
    });

    return optimizeUrl;

}