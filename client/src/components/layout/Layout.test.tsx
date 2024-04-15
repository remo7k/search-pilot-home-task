import Layout from "./Layout";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FakeApiProductsClient from "../../api/products/client/FakeApiProductsClient";
import { ApiClientProvider } from "../../providers/ApiClientProvider";

describe("layout", () => {
  it("should render nav", () => {
    const wrapper = render(
      <ApiClientProvider client={new FakeApiProductsClient()}>
        <QueryClientProvider client={new QueryClient()}>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </QueryClientProvider>
      </ApiClientProvider>,
    );

    expect(wrapper.getByRole("navigation")).toBeInTheDocument();
    expect(wrapper.getByText("home exercise")).toBeInTheDocument();
  });

  it("should render footer", () => {
    const wrapper = render(
      <ApiClientProvider client={new FakeApiProductsClient()}>
        <QueryClientProvider client={new QueryClient()}>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </QueryClientProvider>
      </ApiClientProvider>,
    );

    expect(wrapper.getByRole("contentinfo")).toBeInTheDocument();
  });
});
