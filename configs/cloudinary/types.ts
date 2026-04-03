import { UploadApiResponse } from 'cloudinary';

export interface CloudinaryUploadResponse extends Partial<UploadApiResponse> {
  public_id: string;
  secure_url: string;
  url: string;
  folder?: string;
}

export interface CloudinaryError {
  error?: {
    message: string;
  };
}

export interface CloudinaryTransformations {
  width?: number;
  height?: number;
  crop?: string;
  gravity?: string;
  quality?: string;
  fetch_format?: string;
  [key: string]: string | number | boolean | undefined;
}
