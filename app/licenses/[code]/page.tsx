import { LicenceLayout } from "@/components/pages/licenses";
import {
  getProductInfo,
  getProductNutrition,
  getProductCertificates,
  getProductServing,
  getProductCompany,
} from "@/servers/licenses/license.actions";
import { recordProductView } from "@/servers/dashboard/dashboard.actions";

type LicencePageProps = {
  params: Promise<{
    code: string;
  }>;
  searchParams: Promise<{
    source?: string;
  }>;
};

const NotFoundState = () => (
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

const LicencePage = async ({ params, searchParams }: LicencePageProps) => {
  const { code } = await params;
  const { source } = await searchParams;

  const [product, nutrition, certificates, serving, company] = await Promise.allSettled([
    getProductInfo(code),
    getProductNutrition(code),
    getProductCertificates(code),
    getProductServing(code),
    getProductCompany(code),
  ]);

  if (product.status === "rejected" || !product.value) {
    return <NotFoundState />;
  }

  recordProductView(code, source === "scan" ? "scan" : "view").catch(() => {});

  return (
    <LicenceLayout
      code={code}
      data={{
        product: product.value,
        nutrition: nutrition.status === "fulfilled" ? nutrition.value : null,
        certificates: certificates.status === "fulfilled" ? certificates.value : [],
        serving: serving.status === "fulfilled" ? serving.value : null,
        company: company.status === "fulfilled" ? company.value : null,
      }}
    />
  );
};

export default LicencePage;
