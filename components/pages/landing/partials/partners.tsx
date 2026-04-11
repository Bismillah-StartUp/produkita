import { InfiniteCarousel } from "@/components/ui/infinite-carousel"

export const Partners = () => {
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Dipercaya oleh UMKM Indonesia
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Ribuan UMKM telah mempercayai EntreCertivy untuk mengelola
            sertifikasi produk mereka
          </p>
        </div>

        <InfiniteCarousel speed={10}>
          {[
            <div
              key="logo1"
              className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100"
            >
              <div className="text-center">
                <div className="text-xs font-bold text-blue-600">BPOM</div>
              </div>
            </div>,
            <div
              key="logo2"
              className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100"
            >
              <div className="text-center">
                <div className="text-xs font-bold text-red-600">HALAL</div>
              </div>
            </div>,
            <div
              key="logo3"
              className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100"
            >
              <div className="text-center">
                <div className="text-xs font-bold text-green-600">PIRT</div>
              </div>
            </div>,
            <div
              key="logo4"
              className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100"
            >
              <div className="text-center">
                <div className="text-xs font-bold text-purple-600">SNI</div>
              </div>
            </div>,
            <div
              key="logo5"
              className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100"
            >
              <div className="text-center">
                <div className="text-xs font-bold text-orange-600">UMKM+</div>
              </div>
            </div>,
            <div
              key="logo6"
              className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100"
            >
              <div className="text-center">
                <div className="text-xs font-bold text-indigo-600">ISO</div>
              </div>
            </div>,
          ]}
        </InfiniteCarousel>
      </div>
    </section>
  )
}
