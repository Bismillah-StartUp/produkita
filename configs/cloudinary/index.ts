import { v2 as cloudinary } from "cloudinary"

if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error("Missing Cloudinary configuration")
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_USER,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary