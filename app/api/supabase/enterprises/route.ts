import { NextResponse } from "next/server"
import { getEnterprisesServer } from "@/lib/supabase"

/**
 * GET /api/supabase/enterprises
 * Fetch all enterprises from Supabase
 */
export async function GET() {
  try {
    const enterprises = await getEnterprisesServer()

    return NextResponse.json(
      {
        success: true,
        message: "Enterprises fetched successfully",
        data: enterprises,
        count: enterprises.length,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch enterprises",
        error: message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
