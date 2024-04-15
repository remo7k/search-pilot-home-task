import ProductsClient from "./ProductsClient";
import { Product } from "../model/Product";
import axios from "axios";
import { ProductEditRequest } from "../model/ProductEditRequest";
import { ProductCreateRequest } from "../model/ProductCreateRequest";
import { ProductValidateNameRequest } from "../model/ProductValidateNameRequest";

// add handling errors

class ApiProductsClient implements ProductsClient {
  public getProducts(): Promise<Product[]> {
    // could add converter to make sure the type is correct
    return axios.get("/api/products").then((it) => it.data);
  }

  public createProduct(
    productCreateRequest: ProductCreateRequest,
  ): Promise<Product> {
    return axios
      .post("/api/products", productCreateRequest)
      .then((it) => it.data);
  }

  public getProduct(id: string): Promise<Product> {
    return axios.get(`/api/products/${id}`).then((it) => it.data);
  }

  public editProduct(productEditRequest: ProductEditRequest): Promise<Product> {
    return axios
      .put(`/api/products/${productEditRequest.id}`, productEditRequest)
      .then((it) => it.data);
  }

  public validateProduct(
    productValidateNameRequest: ProductValidateNameRequest,
  ): Promise<{ message?: string; error?: string }> {
    const apiUrl = productValidateNameRequest.id
      ? `/api/validate/${productValidateNameRequest.id}`
      : `/api/validate`;

    return axios
      .post(apiUrl, {
        name: productValidateNameRequest.name,
      })
      .then((it) => it.data);
  }
}

export default ApiProductsClient;
