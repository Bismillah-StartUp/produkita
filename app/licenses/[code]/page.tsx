import { LicenceLayout } from "@/components/pages/licences";
import { getCertificateDetailsByCode } from "@/lib/certificate";

type LicencePageProps = {
  params: Promise<{
    code: string;
  }>;
};

const DUMMY_DATA = {
  certificate: {
    id: 1,
    uuid: "123e4567-e89b-12d3-a456-426614174000",
    bpom_number: "MD 123456789010",
    pirt_number: "MD 123456789010",
    license_number: "LIC-2026-9999",
    coa_number: "MD 123456789010",
    createdAt: new Date(),
  },
  product: {
    id: 1,
    uuid: "123e4567-e89b-12d3-a456-426614174001",
    name: "Susu Cimory Full Cream",
    image_url:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574226516831-e1dff427e5e8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528750717929-32abb73d3bb9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1628043640244-6725206d2036?q=80&w=1000&auto=format&fit=crop",
    ],
    price: 20000,
    brand: "Cimory",
    description:
      "Cimory Fresh Milk adalah susu segar pasteurisasi yang diproduksi langsung dari peternakan sapi berkualitas tinggi di kawasan Prigen, Pasuruan.",
    type: "fnb" as any,
    license_code: "dummy",
    enterprise_id: 1,
  },
  enterprise: {
    id: 1,
    uuid: "123e4567-e89b-12d3-a456-426614174002",
    name: "PT Cisarua Mountain Dairy",
    district: "Cisarua",
    province: "Jawa Barat",
    phone: "+62 812 3456 7890",
    email: "info@cimory.com",
    address: "Jl. Raya Puncak Km. 77, Cisarua, Bogor, Jawa Barat 16750",
    description:
      "Perusahaan yang bergerak di bidang pengolahan susu sapi segar menjadi produk-produk berkualitas.",
  },
  nutrition: {
    id: 1,
    product_id: 1,
    servings: "1 Botol (250ml)",
    energy: "150",
    fat: "8",
    saturated_fat: "5",
    protein: "8",
    carbo: "12",
    sugar: "10",
    natrium: "110",
  },
  halal: {
    id: 1,
    uuid: "123e4567-e89b-12d3-a456-426614174003",
    number: "ID0011000000123012",
    authority: "BPJPH",
    valid_until: new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
  },
};

const LicencePage = async ({ params }: LicencePageProps) => {
  const { code } = await params;

  let data = await getCertificateDetailsByCode(code);

  if (code === "dummy" || !data) {
    data = DUMMY_DATA;
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Produk Tidak Ditemukan
          </h1>
          <p className="mt-2 text-gray-600">
            Kode sertifikat tidak valid atau belum terdaftar
          </p>
        </div>
      </div>
    );
  }

  return <LicenceLayout code={code} data={data} />;
};

export default LicencePage;
