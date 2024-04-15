import FakeApiProductsClient from "../client/FakeApiProductsClient";
import { renderHook, waitFor } from "@testing-library/react";
import {
  useCreateProduct,
  useEditProduct,
  useGetProduct,
  useGetProducts,
  useValidateProductName,
} from "./productsQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Product } from "../model/Product";
import { ProductEditRequest } from "../model/ProductEditRequest";
import { ProductCreateRequest } from "../model/ProductCreateRequest";
import { ProductValidateNameRequest } from "../model/ProductValidateNameRequest";
import { ApiClientProvider } from "../../../providers/ApiClientProvider";

describe("products query", () => {
  it("can get products", async () => {
    const queryClient = new QueryClient();
    const fakeApiClient = new FakeApiProductsClient();

    Array.from([1, 2, 3]).forEach((it) =>
      fakeApiClient.insertProduct({
        id: it,
        name: `Velocity Runner Running Shoes ${it}`,
        type: `footwear ${it}`,
        sizes: ["US 7", "US 8", "US 9", "US 10"],
        features: [
          "Shock-absorbing sole",
          "Breathable mesh upper",
          "Cushioned insole",
        ],
        brand: "RunXpert",
        style: "Trail running shoes",
      }),
    );

    const { result } = renderHook(() => useGetProducts(), {
      wrapper: ({ children }) => (
        <ApiClientProvider client={fakeApiClient}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ApiClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.data).toHaveLength(3));
  });

  it("can create new product", async () => {
    const queryClient = new QueryClient();
    const fakeApiClient = new FakeApiProductsClient();

    const request: ProductCreateRequest = {
      brand: "",
      features: [],
      sizes: [],
      style: "",
      type: "",
      name: `Velocity Runner Running Shoes`,
    };

    const { result } = renderHook(() => useCreateProduct(), {
      wrapper: ({ children }) => (
        <ApiClientProvider client={fakeApiClient}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ApiClientProvider>
      ),
    });

    const newProduct = await result.current.mutateAsync(request);

    expect(newProduct.name).toBe("Velocity Runner Running Shoes");

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it("can get product", async () => {
    const queryClient = new QueryClient();
    const fakeApiClient = new FakeApiProductsClient();

    const expectedItem = {
      id: 1,
      name: `Velocity Runner Running Shoes 1`,
      type: `footwear 1`,
      sizes: ["US 7", "US 8", "US 9", "US 10"],
      features: [
        "Shock-absorbing sole",
        "Breathable mesh upper",
        "Cushioned insole",
      ],
      brand: "RunXpert",
      style: "Trail running shoes",
    };

    Array.from([1, 2, 3]).forEach((it) =>
      fakeApiClient.insertProduct({
        id: it,
        name: `Velocity Runner Running Shoes ${it}`,
        type: `footwear ${it}`,
        sizes: ["US 7", "US 8", "US 9", "US 10"],
        features: [
          "Shock-absorbing sole",
          "Breathable mesh upper",
          "Cushioned insole",
        ],
        brand: "RunXpert",
        style: "Trail running shoes",
      }),
    );

    const { result } = renderHook(() => useGetProduct("1"), {
      wrapper: ({ children }) => (
        <ApiClientProvider client={fakeApiClient}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ApiClientProvider>
      ),
    });

    await waitFor(() =>
      expect(result.current.data).toStrictEqual(expectedItem),
    );
  });

  it("can edit product", async () => {
    const queryClient = new QueryClient();
    const fakeApiClient = new FakeApiProductsClient();

    const product: Product = {
      id: 1,
      brand: "",
      features: [],
      sizes: [],
      style: "",
      type: "",
      name: `Velocity Runner Running Shoes`,
    };

    const editRequest: ProductEditRequest = {
      id: "1",
      brand: "new shiny brand",
      features: [],
      sizes: [],
      style: "",
      type: "",
      name: `Velocity Runner Running Shoes`,
    };

    fakeApiClient.insertProduct(product);

    const { result } = renderHook(() => useEditProduct(), {
      wrapper: ({ children }) => (
        <ApiClientProvider client={fakeApiClient}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ApiClientProvider>
      ),
    });

    const editedProduct = await result.current.mutateAsync(editRequest);

    expect(editedProduct.brand).toBe("new shiny brand");
  });

  it("can pass name validation", async () => {
    const queryClient = new QueryClient();
    const fakeApiClient = new FakeApiProductsClient();

    const product: Product = {
      id: 1,
      brand: "",
      features: [],
      sizes: [],
      style: "",
      type: "",
      name: `Velocity Runner Running Shoes`,
    };

    const request: ProductValidateNameRequest = {
      name: `Velocity Runner Running Shoes for cats`,
    };

    fakeApiClient.insertProduct(product);

    const { result } = renderHook(() => useValidateProductName(), {
      wrapper: ({ children }) => (
        <ApiClientProvider client={fakeApiClient}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ApiClientProvider>
      ),
    });

    const isValid = await result.current.mutateAsync(request);

    expect(isValid.message).toBe("Product name is unique.");
  });

  it("can pass reject validation", async () => {
    const queryClient = new QueryClient();
    const fakeApiClient = new FakeApiProductsClient();

    const product: Product = {
      id: 1,
      brand: "",
      features: [],
      sizes: [],
      style: "",
      type: "",
      name: `Velocity Runner Running Shoes`,
    };

    const request: ProductValidateNameRequest = {
      name: `Velocity Runner Running Shoes`,
    };

    fakeApiClient.insertProduct(product);

    const { result } = renderHook(() => useValidateProductName(), {
      wrapper: ({ children }) => (
        <ApiClientProvider client={fakeApiClient}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ApiClientProvider>
      ),
    });

    try {
      await result.current.mutateAsync(request);
    } catch (error) {
      expect(error).toEqual({
        error: "Product name is not unique.",
      });
    }
  });
});
