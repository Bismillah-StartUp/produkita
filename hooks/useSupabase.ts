"use client"

import { useCallback, useEffect, useState } from "react"
import { createBrowserClient } from "@/configs/supabase"
import type { Database } from "@/configs/supabase"

type TableName = keyof Database["public"]["Tables"]

interface UseSupabaseQuery<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

/**
 * Custom hook to query Supabase data
 * @example
 * const { data: enterprises, loading } = useSupabaseQuery<Enterprise[]>({
 *   table: "enterprises",
 *   query: (q) => q.select("*")
 * })
 */
export function useSupabaseQuery<T = unknown>({
  table,
  query,
  enabled = true,
}: {
  table: TableName
  query?: (q: any) => any
  enabled?: boolean
}): UseSupabaseQuery<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const supabase = createBrowserClient()

  const fetchData = useCallback(async () => {
    if (!enabled) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      let queryBuilder: any = supabase.from(table).select("*")

      if (query) {
        queryBuilder = query(queryBuilder)
      }

      const { data: result, error: err } = await queryBuilder

      if (err) {
        throw err
      }

      setData(result as T)
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [table, query, enabled, supabase])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

/**
 * Custom hook to get a single record by ID
 */
export function useSupabaseRecord<T = unknown>({
  table,
  id,
  enabled = true,
}: {
  table: TableName
  id: string | number | null
  enabled?: boolean
}): UseSupabaseQuery<T> {
  return useSupabaseQuery<T>({
    table,
    query: (q) => (id ? q.eq("id", id).single() : null),
    enabled: enabled && id !== null,
  })
}

/**
 * Custom hook for mutations (insert, update, delete)
 */
interface UseSuperbaseMutation<T = unknown> {
  mutate: (data: T) => Promise<any>
  loading: boolean
  error: Error | null
}

export function useSupabaseMutation({
  table,
  operation = "insert",
}: {
  table: TableName
  operation?: "insert" | "update" | "delete"
}): UseSuperbaseMutation {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const supabase = createBrowserClient()

  const mutate = useCallback(
    async (data: any) => {
      try {
        setLoading(true)
        setError(null)

        let query: any

        switch (operation) {
          case "insert":
            query = await supabase.from(table).insert(data).select()
            break
          case "update":
            query = await supabase.from(table).update(data).select()
            break
          case "delete":
            query = await supabase.from(table).delete().eq("id", data.id)
            break
        }

        if (query.error) {
          throw query.error
        }

        return query.data
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        setError(error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [table, operation, supabase]
  )

  return { mutate, loading, error }
}
