"use client";

import { useState } from "react";
import {
  getProduct,
  getProductsByTenant,
  submitProduct,
} from "@/servers/products/product.actions";
import { CertificateType, ProductCategory, WeightUnits } from "@prisma/client";

export const useProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handle = async <T>(fn: () => Promise<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      return await fn();
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleGetProduct = async (uuid: string) =>
    handle(() => getProduct(uuid));

  const handleGetProductsByTenant = async (tenantUuid: string) =>
    handle(() => getProductsByTenant(tenantUuid));

  const handleDeleteProductImage = async (imageUuid: string) =>
    handle(() => deleteProductImage(imageUuid));

  const handleDeleteServingImage = async (imageUuid: string) =>
    handle(() => deleteServingImage(imageUuid));

  const handleSubmitProduct = async (
    tenantUuid: string,
    tenantEmail: string,
    data: {
      product: {
        name: string;
        brand?: string;
        price?: number;
        description?: string;
        type: ProductCategory;
        weight?: number;
        weight_unit?: WeightUnits;
      };
      productImages: File[];
      nutrition: {
        servings?: number;
        serving_pkgs?: number;
        energy?: number;
        fat?: number;
        saturated_fat?: number;
        protein?: number;
        carbo?: number;
        sugar?: number;
        natrium?: number;
        composition?: string;
        allergens?: string[];
      };
      certificates: {
        type: CertificateType;
        number?: string;
        registered_at?: Date;
        valid_until?: Date;
        lab_name?: string;
        file?: File;
      }[];
      serving: {
        serving_info?: string;
        serving_portion?: string;
        storage_info?: string;
        video_url?: string;
        images?: File[];
      };
    },
  ) =>
    handle(async () => {
      // convert File → Buffer
      const productImages = await Promise.all(
        data.productImages.map(async (f) => Buffer.from(await f.arrayBuffer())),
      );

      const certificates = await Promise.all(
        data.certificates.map(async (cert) => ({
          ...cert,
          file: cert.file
            ? Buffer.from(await cert.file.arrayBuffer())
            : undefined,
        })),
      );

      const servingImages = await Promise.all(
        (data.serving.images ?? []).map(async (f) =>
          Buffer.from(await f.arrayBuffer()),
        ),
      );

      return await submitProduct(tenantUuid, tenantEmail, {
        ...data,
        productImages,
        certificates,
        serving: {
          ...data.serving,
          images: servingImages,
        },
      });
    });

  return {
    loading,
    error,
    getProduct: handleGetProduct,
    getProductsByTenant: handleGetProductsByTenant,
    submitProduct: handleSubmitProduct,
  };
};
