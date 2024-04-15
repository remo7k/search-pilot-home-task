import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./Form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FakeApiProductsClient from "../../api/products/client/FakeApiProductsClient";
import { ApiClientProvider } from "../../providers/ApiClientProvider";

describe("Form Component", () => {
  const mockHandleSubmit = jest.fn((e) => e.preventDefault());

  it("renders correctly with initial state", () => {
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
          <Form handleSubmit={mockHandleSubmit} buttonText="Submit" />
        </QueryClientProvider>
      </ApiClientProvider>,
    );

    expect(wrapper.getByPlaceholderText("Product Name")).toBeInTheDocument();
    expect(wrapper.getByText("Product Types")).toBeInTheDocument();
    expect(
      wrapper.queryByPlaceholderText("Product Size"),
    ).not.toBeInTheDocument();
  });

  it("loads default values correctly", () => {
    const defaultValues = {
      id: 1,
      name: "Classic Shoe",
      type: "footwear",
      sizes: ["US 8"],
      features: ["Waterproof"],
      brand: "Nike",
      style: "Sport",
    };
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
          <Form
            handleSubmit={mockHandleSubmit}
            defaultValues={defaultValues}
            buttonText="Update"
          />
        </QueryClientProvider>
      </ApiClientProvider>,
    );

    expect(wrapper.getByDisplayValue("Classic Shoe")).toBeInTheDocument();
    expect(wrapper.getByDisplayValue("Nike")).toBeInTheDocument();
    expect(wrapper.getByDisplayValue("Waterproof")).toBeInTheDocument();
    expect(wrapper.getByDisplayValue("Sport")).toBeInTheDocument();
    expect(wrapper.getByDisplayValue("US 8")).toBeInTheDocument();
    expect(wrapper.getByDisplayValue("footwear")).toBeInTheDocument();
  });

  it("dynamically changes options based on product type -- footwear", async () => {
    const fakeApiClient = new FakeApiProductsClient();

    const wrapper = render(
      <ApiClientProvider client={fakeApiClient}>
        <QueryClientProvider client={new QueryClient()}>
          <Form handleSubmit={mockHandleSubmit} buttonText="Submit" />
        </QueryClientProvider>
      </ApiClientProvider>,
    );

    const user = userEvent.setup();

    await user.click(wrapper.getByTestId("type"));
    await user.click(await wrapper.findByRole("option", { name: "footwear" }));

    await user.click(await wrapper.findByTestId("size"));

    expect(wrapper.getByRole("option", { name: "US 7" })).toBeInTheDocument();
    expect(wrapper.getByRole("option", { name: "US 8" })).toBeInTheDocument();
    expect(wrapper.getByRole("option", { name: "US 9" })).toBeInTheDocument();
  });

  it("dynamically changes options based on product type -- other than footwear", async () => {
    const fakeApiClient = new FakeApiProductsClient();

    const wrapper = render(
      <ApiClientProvider client={fakeApiClient}>
        <QueryClientProvider client={new QueryClient()}>
          <Form handleSubmit={mockHandleSubmit} buttonText="Submit" />
        </QueryClientProvider>
      </ApiClientProvider>,
    );
    const user = userEvent.setup();

    await user.click(wrapper.getByTestId("type"));
    await user.click(await wrapper.findByRole("option", { name: "top" }));

    await user.click(await wrapper.findByTestId("size"));

    expect(wrapper.getByRole("option", { name: "S" })).toBeInTheDocument();
    expect(wrapper.getByRole("option", { name: "M" })).toBeInTheDocument();
    expect(wrapper.getByRole("option", { name: "L" })).toBeInTheDocument();
    expect(wrapper.getByRole("option", { name: "XL" })).toBeInTheDocument();
  });

  it("submits the form with correct data", async () => {
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
          <Form handleSubmit={mockHandleSubmit} buttonText="Submit" />
        </QueryClientProvider>
      </ApiClientProvider>,
    );

    const user = userEvent.setup();

    await user.type(wrapper.getByPlaceholderText("Product Name"), "New Shoe");
    await user.click(wrapper.getByTestId("type"));
    await user.click(wrapper.getByRole("option", { name: "footwear" }));

    await user.click(wrapper.getByTestId("size"));
    await user.click(wrapper.getByRole("option", { name: "US 7" }));

    await user.type(
      wrapper.getByPlaceholderText("Product Brand"),
      "New Balance",
    );

    await user.type(
      wrapper.getByPlaceholderText("Product Features"),
      "Super Feature",
    );

    await user.type(
      wrapper.getByPlaceholderText("Product Style"),
      "Super Style",
    );

    fireEvent.submit(wrapper.getByTestId("form"));

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          brand: "New Balance",
          features: "Super Feature",
          name: "New Shoe",
          size: "US 7",
          style: "Super Style",
          type: "footwear",
        }),
      );
    });
  });

  it("rejects form if name is not unique", async () => {
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
          <Form handleSubmit={mockHandleSubmit} buttonText="Submit" />
        </QueryClientProvider>
      </ApiClientProvider>,
    );

    const user = userEvent.setup();

    await user.type(
      wrapper.getByPlaceholderText("Product Name"),
      "Test Product",
    );
    await user.click(wrapper.getByTestId("type"));
    await user.click(wrapper.getByRole("option", { name: "footwear" }));

    await user.click(wrapper.getByTestId("size"));
    await user.click(wrapper.getByRole("option", { name: "US 7" }));

    await user.type(
      wrapper.getByPlaceholderText("Product Brand"),
      "New Balance",
    );

    await user.type(
      wrapper.getByPlaceholderText("Product Features"),
      "Super Feature",
    );

    await user.type(
      wrapper.getByPlaceholderText("Product Style"),
      "Super Style",
    );

    fireEvent.submit(wrapper.getByTestId("form"));

    await waitFor(() =>
      expect(
        wrapper.getByText("Product name must be unique."),
      ).toBeInTheDocument(),
    );

    expect(mockHandleSubmit).not.toHaveBeenCalled();
  });

  // add test for missing product types
});
