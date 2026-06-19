"use client";

import { ProductStats, ProductToolbar, ProductTable } from "./partials";

export function ProductListPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">List Produk</h1>
        </div>

        <ProductStats totalProducts={8} pendingProducts={2} />
        <ProductToolbar />

        <ProductTable />
      </div>
    </div>
  );
}
