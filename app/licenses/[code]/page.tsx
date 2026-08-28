import { LicenceLayout } from "@/components/pages/licenses";
import {
  getProductInfoApi,
  getProductNutritionApi,
  getProductCertificatesApi,
  getProductServingApi,
  getProductCompanyApi,
  recordProductViewApi,
} from "@/lib/license/api";

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
    getProductInfoApi(code),
    getProductNutritionApi(code),
    getProductCertificatesApi(code),
    getProductServingApi(code),
    getProductCompanyApi(code),
  ]);

  if (product.status === "rejected" || !product.value.success || !product.value.data) {
    return <NotFoundState />;
  }

  recordProductViewApi(code, source === "scan" ? "scan" : "view").catch(() => {});

  return (
    <LicenceLayout
      code={code}
      data={{
        product: product.value.data as any,
        nutrition: nutrition.status === "fulfilled" && nutrition.value.success ? (nutrition.value.data as any) : null,
        certificates: certificates.status === "fulfilled" && certificates.value.success ? (certificates.value.data as any) : [],
        serving: serving.status === "fulfilled" && serving.value.success ? (serving.value.data as any) : null,
        company: company.status === "fulfilled" && company.value.success ? (company.value.data as any) : null,
      }}
    />
  );
};

export default LicencePage;
