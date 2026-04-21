import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * GET /api/supabase/health
 * Test Supabase connection and return database status
 */
export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        {
          success: false,
          message: "Supabase credentials not configured",
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      )
    }

    const cookieStore = await cookies()
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    })

    // Test connection by fetching tables info
    const { data: tables, error: tablesError } = await supabase
      .from("enterprises")
      .select("id", { count: "exact", head: true })

    if (tablesError && tablesError.code !== "PGRST116") {
      return NextResponse.json(
        {
          success: false,
          message: "Supabase connection failed",
          error: tablesError.message,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      )
    }

    // Get auth session
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession()

    return NextResponse.json(
      {
        success: true,
        message: "Supabase connection successful",
        data: {
          url: supabaseUrl,
          database: "Connected",
          tablesAccessible: true,
          authenticated: !!sessionData?.session,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      {
        success: false,
        message: "Supabase health check failed",
        error: message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
