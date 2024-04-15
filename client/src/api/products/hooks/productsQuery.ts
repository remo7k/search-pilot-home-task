import ProductsClient from "../client/ProductsClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Product } from "../model/Product";
import { ProductEditRequest } from "../model/ProductEditRequest";
import { ProductCreateRequest } from "../model/ProductCreateRequest";
import { ProductValidateNameRequest } from "../model/ProductValidateNameRequest";
import { useApiClient } from "../../../providers/ApiClientProvider";

export const doGetProducts = (apiClient: ProductsClient) =>
  apiClient.getProducts();

export const useGetProducts = () => {
  const apiProductsClient = useApiClient();

  return useQuery({
    queryKey: ["products"],
    queryFn: async () => doGetProducts(apiProductsClient),
  });
};

export const doCreateProduct = (
  apiClient: ProductsClient,
  productCreateRequest: ProductCreateRequest,
): Promise<Product> => apiClient.createProduct(productCreateRequest);

export const useCreateProduct = () => {
  const apiProductsClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productCreateRequest: ProductCreateRequest) =>
      doCreateProduct(apiProductsClient, productCreateRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const doGetProduct = (apiClient: ProductsClient, id: string) =>
  apiClient.getProduct(id);

export const useGetProduct = (id: string) => {
  const apiProductsClient = useApiClient();
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => doGetProduct(apiProductsClient, id),
  });
};

export const doEditProduct = (
  apiClient: ProductsClient,
  productEditRequest: ProductEditRequest,
): Promise<Product> => apiClient.editProduct(productEditRequest);

export const useEditProduct = () => {
  const apiProductsClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productEditRequest: ProductEditRequest) =>
      doEditProduct(apiProductsClient, productEditRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const doValidateProductName = (
  apiClient: ProductsClient,
  productValidateNameRequest: ProductValidateNameRequest,
): Promise<{ message?: string; error?: string }> =>
  apiClient.validateProduct(productValidateNameRequest);

export const useValidateProductName = () => {
  const apiProductsClient = useApiClient();

  return useMutation({
    mutationFn: (productValidateNameRequest: ProductValidateNameRequest) =>
      doValidateProductName(apiProductsClient, productValidateNameRequest),
  });
};
