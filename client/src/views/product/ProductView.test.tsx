import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProductView from "./ProductView";
import { ApiClientProvider } from "../../providers/ApiClientProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FakeApiProductsClient from "../../api/products/client/FakeApiProductsClient";

describe("ProductView", () => {
  it("renders the form with default values", async () => {
    const fakeApiClient = new FakeApiProductsClient();

    fakeApiClient.insertProduct({
      id: 1,
      name: "Test Product",
      type: "footwear",
      sizes: ["Test Size"],
      features: ["Test Features"],
      brand: "Test Brand",
      style: "Test Style",
    });

    const wrapper = render(
      <ApiClientProvider client={fakeApiClient}>
        <QueryClientProvider client={new QueryClient()}>
          <MemoryRouter initialEntries={["/products/1"]}>
            <Routes>
              <Route path="products/:id" element={<ProductView />}></Route>
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </ApiClientProvider>,
    );

    await waitFor(() => {
      expect(wrapper.getByPlaceholderText("Product Name")).toHaveValue(
        "Test Product",
      );
    });
  });
});
