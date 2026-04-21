// Cloudinary Upload Folders
export const CLOUDINARY_FOLDERS = {
  CERTIFICATIONS: "certivy/certifications",
  USERS: "certivy/users",
  AVATARS: "certivy/avatars",
  DOCUMENTS: "certivy/documents",
  PRODUCTS: "certivy/products",
} as const

// Cloudinary Upload Options
export const CLOUDINARY_UPLOAD_OPTIONS = {
  AVATARS: {
    folder: CLOUDINARY_FOLDERS.AVATARS,
    resource_type: "auto" as const,
    quality: "auto" as const,
    fetch_format: "auto" as const,
    crop: "fill" as const,
    gravity: "face" as const,
    width: 300,
    height: 300,
  },
  DOCUMENTS: {
    folder: CLOUDINARY_FOLDERS.PRODUCTS,
    resource_type: "auto" as const,
    quality: "auto" as const,
    fetch_format: "auto" as const,
    width: 1200,
    height: 1200,
    crop: "fit" as const,
  },
  CERTIFICATIONS: {
    folder: CLOUDINARY_FOLDERS.CERTIFICATIONS,
    resource_type: "auto" as const,
    quality: "auto" as const,
    fetch_format: "auto" as const,
  },
} as const
