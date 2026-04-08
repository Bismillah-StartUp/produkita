// Supabase Configuration Constants
export const SUPABASE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  key: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
} as const

// Table Names
export const SUPABASE_TABLES = {
  USERS: "users",
  CERTIFICATIONS: "certifications",
  USERS_CERTIFICATIONS: "users_certifications",
  DOCUMENTS: "documents",
} as const
