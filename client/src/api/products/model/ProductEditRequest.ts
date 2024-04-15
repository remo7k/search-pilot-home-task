export interface ProductEditRequest {
  id: string;
  name: string;
  type: string;
  sizes: string[];
  features: string[];
  brand: string;
  style?: string;
  colour?: string;
  materials?: string;
  neckline?: string;
}
