import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImageOnCloudinary(image: File) {
    try {
        const imageBuffer = Buffer.from(await image.arrayBuffer())
        // Return the uploaded result as a Promise
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { public_id: `${image?.name?.split(".")?.[0]}-${Date.now()}` },
                (error, result) => {
                    if (error) {
                        reject(error)
                    } else if (result) {
                        resolve(result.secure_url)
                    }
                }
            );
            stream.end(imageBuffer)
        })
    } catch (error) {
        console.log(error)
    }
}

export async function deleteImageFromCloudinary(url: string) {
    try {
        const publicId = url?.split('/')?.pop()?.split('.')?.shift();
        await cloudinary.uploader.destroy(publicId as string);
        return true;
    } catch (error) {
        console.log(error)
    }
}