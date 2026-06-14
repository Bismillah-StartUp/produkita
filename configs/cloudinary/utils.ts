import cloudinary from "./index"
import { CLOUDINARY_UPLOAD_OPTIONS } from "./constants"
import { CloudinaryUploadResponse, CloudinaryTransformations } from "./types"

// Upload image to Cloudinary
export const uploadImage = async (
  file: Buffer | string,
  uploadType: "avatars" | "certifications" | "documents" | "tenants" | "products" = "documents"
): Promise<CloudinaryUploadResponse> => {
  const uploadOptions =
    CLOUDINARY_UPLOAD_OPTIONS[
      uploadType.toUpperCase() as keyof typeof CLOUDINARY_UPLOAD_OPTIONS
    ]

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error)
        } else if (result) {
          resolve(result as unknown as CloudinaryUploadResponse)
        } else {
          reject(new Error("Upload failed: no result returned"))
        }
      }
    )

    if (typeof file === "string") {
      uploadStream.end(Buffer.from(file))
    } else {
      uploadStream.end(file)
    }
  })
}

// Delete image from Cloudinary
export const deleteImage = async (
  publicId: string
): Promise<{ result: string }> => {
  return cloudinary.uploader.destroy(publicId)
}

// Get image URL with transformations
export const getImageUrl = (
  publicId: string,
  transformations?: CloudinaryTransformations
): string => {
  return cloudinary.url(publicId, {
    secure: true,
    ...transformations,
  })
}
