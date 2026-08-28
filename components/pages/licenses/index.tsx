"use client";

import { useEffect } from "react";
import ProductOverview from "./partials/product-overview";
import CertificationsSection, { CertificationData } from "./partials/certifications-section";
import NutritionFacts from "./partials/nutrition-facts";
import ServingInfo from "./partials/serving-info";
import CompanyInfo from "./partials/company-info";
import { useLicenceContext } from "@/app/licenses/[code]/layout";
import { CertificateType, ProductCategory, WeightUnits } from "@/lib/enums";

interface ProductData {
  uuid: string;
  name: string;
  brand: string | null;
  price: number | null;
  weight: number | null;
  weight_unit: WeightUnits | null;
  description: string | null;
  type: ProductCategory;
  license_code: string | null;
  updated_at: Date;
  images: { uuid: string; url: string }[];
  certificates: { type: CertificateType; number: string | null }[];
  tenant: { city: string | null; province: string | null } | null;
}

interface NutritionData {
  servings: number | null;
  serving_pkgs: number | null;
  energy: number | null;
  fat: number | null;
  saturated_fat: number | null;
  protein: number | null;
  carbo: number | null;
  sugar: number | null;
  natrium: number | null;
  composition: string | null;
  allergens: string[];
}

interface CertificateData {
  uuid: string;
  type: CertificateType;
  number: string | null;
  registered_at: Date | null;
  valid_until: Date | null;
  lab_name: string | null;
  certificate_url: string | null;
}

interface ServingData {
  serving_info: string | null;
  serving_portion: string | null;
  storage_info: string | null;
  video_url: string | null;
  images: { uuid: string; url: string }[];
}

interface CompanyData {
  uuid: string;
  name: string | null;
  trade_name: string | null;
  business_field: string | null;
  description: string | null;
  address: string | null;
  city: string | null;
  province: string | null;
  postal_code: string | null;
  email: string | null;
  phonenumber: string | null;
  website: string | null;
  logo_url: string | null;
  place_url: string | null;
  latitude: number | null;
  longitude: number | null;
  year: number | null;
}

interface LicenceLayoutData {
  product: ProductData;
  nutrition: NutritionData | null;
  certificates: CertificateData[];
  serving: ServingData | null;
  company: CompanyData | null;
}

interface LicenceLayoutProps {
  code: string;
  data: LicenceLayoutData;
}

const CERT_AUTHORITY: Record<CertificateType, string> = {
  bpom: "Badan Pengawas Obat dan Makanan (BPOM)",
  pirt: "Dinas Kesehatan",
  halal: "Badan Penyelenggara Jaminan Produk Halal (BPJPH)",
  coa: "Lab. Balai Besar Industri Agro",
};

const CERT_TYPE_LABEL: Record<CertificateType, CertificationData["type"]> = {
  bpom: "BPOM",
  pirt: "PIRT",
  halal: "HALAL",
  coa: "COA",
};

export const LicenceLayout = ({ data }: LicenceLayoutProps) => {
  const { setEnterpriseName, setLogoUrl, setShowCertifications } = useLicenceContext();

  const { product, nutrition, certificates, serving, company } = data;

  const enterpriseName = company?.trade_name || company?.name || "Enterprise";
  const showCertifications = certificates.length > 0;

  useEffect(() => {
    setEnterpriseName(enterpriseName);
  }, [enterpriseName, setEnterpriseName]);

  useEffect(() => {
    setLogoUrl(company?.logo_url ?? null);
  }, [company?.logo_url, setLogoUrl]);

  useEffect(() => {
    setShowCertifications(showCertifications);
  }, [setShowCertifications, showCertifications]);

  const productImages = product.images.map((img) => img.url);

  const certificationsData: CertificationData[] = certificates.map((cert) => ({
    type: CERT_TYPE_LABEL[cert.type],
    number: cert.number || "-",
    authority: cert.lab_name || CERT_AUTHORITY[cert.type],
    issueDate: cert.registered_at ?? undefined,
    validUntil: cert.valid_until ?? undefined,
  }));

  const certNumberByType = (type: CertificateType) =>
    certificates.find((c) => c.type === type)?.number ?? undefined;

  const volume = product.weight && product.weight_unit
    ? `${product.weight} ${product.weight_unit}`
    : undefined;

  return (
    <>
      {/* Product Overview Section */}
      <section id="section-overview" className="pb-4 lg:pb-32">
        <ProductOverview
          productName={product.name}
          productImage={productImages[0]}
          images={productImages}
          price={product.price}
          volume={volume}
          enterpriseName={enterpriseName}
          enterpriseDistrict={company?.city}
          enterpriseProvince={company?.province}
          certifications={{
            bpomNumber: certNumberByType("bpom"),
            pirtNumber: certNumberByType("pirt"),
            halalNumber: certNumberByType("halal"),
            coaNumber: certNumberByType("coa"),
            isLicensed: !!product.license_code,
          }}
          description={product.description ?? undefined}
          verificationDate={new Date(product.updated_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        />
      </section>

      {/* Nutrition Facts Section */}
      {nutrition && (
        <section
          id="section-nutrition"
          className="pb-4 lg:border-t border-slate-200 pt-0 lg:pt-16"
        >
          <NutritionFacts
            productName={product.name}
            servings={nutrition.servings ?? undefined}
            calories={nutrition.energy ?? undefined}
            fat={nutrition.fat ?? undefined}
            saturatedFat={nutrition.saturated_fat ?? undefined}
            carbs={nutrition.carbo ?? undefined}
            protein={nutrition.protein ?? undefined}
            sodium={nutrition.natrium ?? undefined}
            sugar={nutrition.sugar ?? undefined}
            allergens={nutrition.allergens}
            ingredients={nutrition.composition ?? product.description ?? undefined}
          />
        </section>
      )}

      {/* Certifications Section */}
      {certificationsData.length > 0 && (
        <section
          id="section-certifications"
          className="pb-4 lg:pb-16 lg:border-t border-slate-200 pt-0 lg:pt-16"
        >
          <CertificationsSection
            productName={product.name}
            certifications={certificationsData}
          />
        </section>
      )}

      {/* Serving Info Section */}
      <section
        id="section-serving"
        className="pb-4 lg:pb-16 lg:border-t border-slate-200 pt-0 lg:pt-16"
      >
        <ServingInfo
          productName={product.name}
          productImage={productImages[0]}
          images={serving?.images.map((img) => img.url)}
          servingInfo={serving?.serving_info}
          storageInfo={serving?.storage_info}
          servingPortion={serving?.serving_portion}
          videoUrl={serving?.video_url}
        />
      </section>

      {/* Company Info Section */}
      <section
        id="section-company"
        className="pb-4 lg:pb-16 pt-0 lg:pt-16 lg:border-t border-slate-200"
      >
        <CompanyInfo
          name={enterpriseName}
          address={company?.address ?? undefined}
          phone={company?.phonenumber ?? undefined}
          email={company?.email ?? undefined}
          description={company?.description ?? undefined}
          trademark={company?.trade_name ?? undefined}
          businessType={company?.business_field ?? undefined}
          foundedYear={company?.year?.toString()}
          npwp={undefined}
          website={company?.website ?? undefined}
          mapUrl={
            company?.latitude && company?.longitude
              ? `https://www.google.com/maps?q=${company.latitude},${company.longitude}`
              : undefined
          }
          latitude={company?.latitude}
          longitude={company?.longitude}
          bannerImage={company?.place_url ?? undefined}
        />
      </section>
    </>
  );
};
