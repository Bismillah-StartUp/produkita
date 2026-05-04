import { createBrowserClient, createServerClient } from "@/configs/supabase"
import { cookies } from "next/headers"


const executeQuery = async <T>(
  queryFn: (supabase: any) => Promise<{ data: T | null; error: any }>,
  fallback: T,
  errorMessage: string
): Promise<T> => {
  try {
    const { data, error } = await queryFn(createBrowserClient())

    if (error) {
      console.error(errorMessage, error)
      return fallback
    }

    return data ?? fallback
  } catch (err) {
    console.error(errorMessage, err)
    return fallback
  }
}


const executeServerQuery = async <T>(
  queryFn: (supabase: any) => Promise<{ data: T | null; error: any }>,
  fallback: T,
  errorMessage: string
): Promise<T> => {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(cookieStore)

    const { data, error } = await queryFn(supabase)

    if (error) {
      console.error(errorMessage, error)
      return fallback
    }

    return data ?? fallback
  } catch (err) {
    console.error(errorMessage, err)
    return fallback
  }
}


export async function getEnterprises() {
  return executeQuery(
    (supabase) =>
      supabase
        .from("enterprises")
        .select("*")
        .order("createdAt", { ascending: false }),
    [],
    "Error fetching enterprises:"
  )
}

export async function getEnterpriseById(id: number) {
  return executeQuery(
    (supabase) =>
      supabase
        .from("enterprises")
        .select("*")
        .eq("id", id)
        .single(),
    null,
    "Error fetching enterprise:"
  )
}

export async function getEnterpriseProducts(enterpriseId: number) {
  return executeQuery(
    (supabase) =>
      supabase
        .from("products")
        .select("*")
        .eq("enterprise_id", enterpriseId)
        .order("createdAt", { ascending: false }),
    [],
    "Error fetching products:"
  )
}

export async function getProductByBarcode(barcode: string) {
  return executeQuery(
    (supabase) =>
      supabase
        .from("products")
        .select("*")
        .eq("barcode", barcode)
        .single(),
    null,
    "Error fetching product:"
  )
}

export async function getProductCertificates(productId: number) {
  return executeQuery(
    (supabase) =>
      supabase
        .from("certificates")
        .select("*")
        .eq("product_id", productId)
        .order("createdAt", { ascending: false }),
    [],
    "Error fetching certificates:"
  )
}


export async function getServerSupabase() {
  const cookieStore = await cookies()
  return createServerClient(cookieStore)
}

export async function getEnterprisesServer() {
  return executeServerQuery(
    (supabase) =>
      supabase
        .from("enterprises")
        .select("*")
        .order("createdAt", { ascending: false }),
    [],
    "Error fetching enterprises:"
  )
}


export async function getByUuidServer<T>(table: string, uuid: string): Promise<T | null> {
  return executeServerQuery(
    (supabase) =>
      supabase
        .from(table)
        .select("*")
        .eq("uuid", uuid)
        .single(),
    null,
    `Error fetching ${table} by UUID:`
  )
}


export async function getEnterpriseByUuidServer(uuid: string) {
  return getByUuidServer("enterprises", uuid)
}

export async function getProductByUuidServer(uuid: string) {
  return getByUuidServer("products", uuid)
}

export async function getCertificateByUuidServer(uuid: string) {
  return getByUuidServer("certificates", uuid)
}
