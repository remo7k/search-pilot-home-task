import ProductsClient from "./ProductsClient";
import { Product } from "../model/Product";
import { ProductEditRequest } from "../model/ProductEditRequest";
import { ProductCreateRequest } from "../model/ProductCreateRequest";
import { ProductValidateNameRequest } from "../model/ProductValidateNameRequest";

// this could be used for a api client provider instead of using mocks in tests

class FakeApiProductsClient implements ProductsClient {
  private products: Product[] = [];

  public insertProduct(product: Product) {
    this.products.push(product);
  }

  public getProducts(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }

  public createProduct(
    productCreateRequest: ProductCreateRequest,
  ): Promise<Product> {
    const {
      name,
      type,
      sizes,
      features,
      brand,
      colour,
      style,
      materials,
      neckline,
    } = productCreateRequest;
    const id = Number(
      new Date()
        .toISOString()
        .replace(/[^0-9]/g, "")
        .slice(8, 14),
    );

    let newProduct: Product = {
      id,
      name,
      type,
      sizes,
      features,
      brand,
      colour,
      style,
      materials,
      neckline,
    };

    this.products.push(newProduct);

    return Promise.resolve(newProduct);
  }

  getProduct(id: string): Promise<Product> {
    return Promise.resolve(this.products.find((it) => it.id === Number(id)));
  }

  editProduct(request: ProductEditRequest) {
    const productIndex = this.products.findIndex(
      (it) => it.id === Number(it.id),
    );

    if (productIndex >= 0) {
      this.products[productIndex] = {
        id: Number(request.id),
        name: request.name,
        type: request.type,
        sizes: request.sizes,
        features: request.features,
        brand: request.brand,
        style: request.style,
        colour: request.colour,
        materials: request.materials,
        neckline: request.neckline,
      };

      return Promise.resolve(this.products[productIndex]);
    }
  }

  validateProduct(
    productValidateNameRequest: ProductValidateNameRequest,
  ): Promise<{ message?: string; error?: string }> {
    const isNameUnique = !this.products
      .filter((product) => product.id !== Number(productValidateNameRequest.id))
      .find((product) => product.name === productValidateNameRequest.name);

    if (isNameUnique) {
      return Promise.resolve({ message: "Product name is unique." });
    }

    return Promise.reject({ error: "Product name is not unique." });
  }
}

export default FakeApiProductsClient;
