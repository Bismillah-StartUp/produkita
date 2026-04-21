// Supabase Database Types - Generated from Prisma schema

export enum ProductCategory {
  FOOD = "FOOD",
  BEVERAGE = "BEVERAGE",
  COSMETIC = "COSMETIC",
  PHARMACEUTICAL = "PHARMACEUTICAL",
  SUPPLEMENT = "SUPPLEMENT",
}

export interface Database {
  public: {
    Tables: {
      certificates: {
        Row: {
          id: number
          uuid: string
          enterprise_id: number
          product_id: number
          description: string | null
          bpom_number: string | null
          pirt_number: string | null
          lisence_number: string | null
          halal_id: number | null
          createdAt: string
          updatedAt: string
        }
        Insert: Omit<Database["public"]["Tables"]["certificates"]["Row"], "id" | "createdAt" | "updatedAt">
        Update: Partial<Database["public"]["Tables"]["certificates"]["Row"]>
      }
      enterprises: {
        Row: {
          id: number
          uuid: string
          name: string
          phone: string | null
          email: string | null
          description: string | null
          address: string | null
          status: string
          createdAt: string
          updatedAt: string
        }
        Insert: Omit<Database["public"]["Tables"]["enterprises"]["Row"], "id" | "createdAt" | "updatedAt">
        Update: Partial<Database["public"]["Tables"]["enterprises"]["Row"]>
      }
      products: {
        Row: {
          id: number
          uuid: string
          name: string
          image_url: string | null
          price: number | null
          brand: string | null
          description: string | null
          enterprise_id: number
          type: ProductCategory
          barcode: string | null
          createdAt: string
          updatedAt: string
        }
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "id" | "createdAt" | "updatedAt">
        Update: Partial<Database["public"]["Tables"]["products"]["Row"]>
      }
      halals: {
        Row: {
          id: number
          uuid: string
          number: string
          authority: string | null
          valid_until: string | null
          createdAt: string
          updatedAt: string
        }
        Insert: Omit<Database["public"]["Tables"]["halals"]["Row"], "id" | "createdAt" | "updatedAt">
        Update: Partial<Database["public"]["Tables"]["halals"]["Row"]>
      }
      nutrition_info: {
        Row: {
          id: number
          product_id: number
          servings: number | null
          energy: number | null
          fat: number | null
          saturated_fat: number | null
          protein: number | null
          carbo: number | null
          sugar: number | null
          natrium: number | null
          createdAt: string
          updatedAt: string
        }
        Insert: Omit<Database["public"]["Tables"]["nutrition_info"]["Row"], "id" | "createdAt" | "updatedAt">
        Update: Partial<Database["public"]["Tables"]["nutrition_info"]["Row"]>
      }
    }
    Views: Record<string, unknown>
    Functions: Record<string, unknown>
    Enums: {
      ProductCategory: ProductCategory
    }
    CompositeTypes: Record<string, unknown>
  }
}
