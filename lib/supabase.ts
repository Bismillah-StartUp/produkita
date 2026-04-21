/**
 * Supabase Utility Functions
 * Common operations for Supabase database
 */

import { createBrowserClient } from "@/configs/supabase"
import { createServerClient } from "@/configs/supabase"
import { type Database } from "@/configs/supabase"
import { cookies } from "next/headers"

// ============================================================================
// Client-side utilities
// ============================================================================

export const supabaseClient = createBrowserClient()

/**
 * Fetch enterprises from Supabase
 */
export async function getEnterprises() {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from("enterprises")
    .select("*")
    .order("createdAt", { ascending: false })

  if (error) {
    console.error("Error fetching enterprises:", error)
    return []
  }

  return data
}

/**
 * Fetch single enterprise by ID
 */
export async function getEnterpriseById(id: number) {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from("enterprises")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching enterprise:", error)
    return null
  }

  return data
}

/**
 * Fetch products for an enterprise
 */
export async function getEnterpriseProducts(enterpriseId: number) {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("enterprise_id", enterpriseId)
    .order("createdAt", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data
}

/**
 * Fetch product by barcode
 */
export async function getProductByBarcode(barcode: string) {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("barcode", barcode)
    .single()

  if (error) {
    console.error("Error fetching product:", error)
    return null
  }

  return data
}

/**
 * Fetch certificates for a product
 */
export async function getProductCertificates(productId: number) {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("product_id", productId)
    .order("createdAt", { ascending: false })

  if (error) {
    console.error("Error fetching certificates:", error)
    return []
  }

  return data
}

// ============================================================================
// Server-side utilities
// ============================================================================

/**
 * Get server-side Supabase client
 */
export async function getServerSupabase() {
  const cookieStore = await cookies()
  return createServerClient(cookieStore)
}

/**
 * Fetch enterprises (server-side)
 */
export async function getEnterprisesServer() {
  const supabase = await getServerSupabase()
  const { data, error } = await supabase
    .from("enterprises")
    .select("*")
    .order("createdAt", { ascending: false })

  if (error) {
    console.error("Error fetching enterprises:", error)
    return []
  }

  return data
}

/**
 * Fetch single enterprise by UUID (server-side)
 */
export async function getEnterpriseByUuidServer(uuid: string) {
  const supabase = await getServerSupabase()
  const { data, error } = await supabase
    .from("enterprises")
    .select("*")
    .eq("uuid", uuid)
    .single()

  if (error) {
    console.error("Error fetching enterprise:", error)
    return null
  }

  return data
}

/**
 * Fetch product by UUID with certificates and nutrition info (server-side)
 */
export async function getProductByUuidServer(uuid: string) {
  const supabase = await getServerSupabase()
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("uuid", uuid)
    .single()

  if (error) {
    console.error("Error fetching product:", error)
    return null
  }

  return data
}

/**
 * Fetch certificate with related data by UUID (server-side)
 */
export async function getCertificateByUuidServer(uuid: string) {
  const supabase = await getServerSupabase()
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("uuid", uuid)
    .single()

  if (error) {
    console.error("Error fetching certificate:", error)
    return null
  }

  return data
}
