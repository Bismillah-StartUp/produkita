import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

const createCookieConfig = (
  cookieStore: Awaited<ReturnType<typeof cookies>>
) => ({
  getAll() {
    return cookieStore.getAll()
  },
  setAll(cookiesToSet: any[]) {
    try {
      cookiesToSet.forEach(({ name, value, options }: any) =>
        cookieStore.set(name, value, options)
      )
    } catch {
      // The `setAll` method was called from a Server Component.
      // This can be ignored if you have middleware refreshing user sessions.
    }
  },
})

export const createClient = (
  cookieStore: Awaited<ReturnType<typeof cookies>>
) => {
  return createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: createCookieConfig(cookieStore),
  })
}

export const getCookieConfig = createCookieConfig
export const getSupabaseUrl = () => supabaseUrl
export const getSupabaseKey = () => supabaseKey
