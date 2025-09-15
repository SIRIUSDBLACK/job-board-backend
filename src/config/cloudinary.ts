import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

export const uploadToCloudinary = async (
  file: Express.Multer.File,
  userId: number
) => {
  const result = await cloudinary.uploader.upload(file.path, {
    resource_type: "raw", // important for PDFs
    folder: "cv_uploads", // optional folder in cloudinary
    public_id: `${userId}_${Date.now()}`, // unique name
  });

  console.log(result);
  const downloadUrl = result.secure_url.replace("/upload/", "/upload/fl_attachment/");

  try {
    fs.unlinkSync(file.path);
  } catch (err) {
    console.error("Failed to delete temp file:", err);
  }
  console.log(downloadUrl);
  return downloadUrl;
};

export default cloudinary;
