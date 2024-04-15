import { Product } from "../model/Product";
import { ProductEditRequest } from "../model/ProductEditRequest";
import { ProductCreateRequest } from "../model/ProductCreateRequest";
import { ProductValidateNameRequest } from "../model/ProductValidateNameRequest";

interface ProductsClient {
  getProducts: () => Promise<Product[]>;
  createProduct: (
    productCreateRequest: ProductCreateRequest,
  ) => Promise<Product>;
  getProduct: (id: string) => Promise<Product>;
  editProduct: (productEditRequest: ProductEditRequest) => Promise<Product>;
  validateProduct: (
    productValidateNameRequest: ProductValidateNameRequest,
  ) => Promise<{ message?: string; error?: string }>;
}

export default ProductsClient;
