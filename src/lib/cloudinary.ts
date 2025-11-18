import { v2 as cloudinary } from "cloudinary";

export const getCloudinary = () => {
  cloudinary.config(process.env.CLOUDINARY_URL ?? "");
  return cloudinary;
};
