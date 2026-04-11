import { Carousel } from "@/components/ui/carousel"
import { TestimonialCard } from "@/components/testimonial-card"

const TESTIMONIALS = [
  {
    name: "Budi Santoso",
    company: "PT Batik Nusantara",
    description:
      "Dengan Certivy, proses sertifikasi produk kami menjadi lebih mudah dan cepat. Tim support mereka sangat responsif dan membantu.",
    rating: 5,
  },
  {
    name: "Siti Nurhaliza",
    company: "Kue Cokelat Rumahan",
    description:
      "Platform ini sudah membantu kami mendapatkan sertifikat BPOM dan HALAL dengan lebih terstruktur. Sangat merekomendasikan!",
    rating: 5,
  },
  {
    name: "Rudi Harjanto",
    company: "Minyak Kelapa Organik",
    description:
      "Interface-nya user-friendly dan dokumentasi lengkap. Sekarang produk kami lebih percaya diri di pasaran.",
    rating: 5,
  },
  {
    name: "Dina Wijaya",
    company: "Kerajinan Kulit Handmade",
    description:
      "Investasi terbaik untuk bisnis kami. Dashboard analytics sangat membantu tracking status sertifikasi.",
    rating: 5,
  },
]

export const Testimonials = () => {
  return (
    <section id="clients" className="py-20 md:py-32">
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

        <div className="mb-12">
          <Carousel className="mx-auto max-w-4xl">
            {TESTIMONIALS.map((testimonial, i) => (
              <div key={i} className="px-4">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="mt-16 grid gap-6 border-t border-gray-200 pt-12 text-center md:grid-cols-4">
          <div>
            <p className="text-3xl font-bold text-blue-600">2,500+</p>
            <p className="mt-2 text-gray-600">UMKM Aktif</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">15,000+</p>
            <p className="mt-2 text-gray-600">Produk Tersertifikasi</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">98%</p>
            <p className="mt-2 text-gray-600">Kepuasan Klien</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">24/7</p>
            <p className="mt-2 text-gray-600">Support Tersedia</p>
          </div>
        </div>
      </div>
    </section>
  )
}
