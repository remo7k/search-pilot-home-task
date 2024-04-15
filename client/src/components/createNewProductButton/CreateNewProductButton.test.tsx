import React from "react";
import { render } from "@testing-library/react";
import CreateNewProductButton from "./CreateNewProductButton";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FakeApiProductsClient from "../../api/products/client/FakeApiProductsClient";
import { ApiClientProvider } from "../../providers/ApiClientProvider";

describe("CreateNewProductButton", () => {
  it("opens and closes the dialog", async () => {
    const fakeApiClient = new FakeApiProductsClient();

    const wrapper = render(
      <ApiClientProvider client={fakeApiClient}>
        <QueryClientProvider client={new QueryClient()}>
          <CreateNewProductButton />
        </QueryClientProvider>
      </ApiClientProvider>,
    );
    const user = userEvent.setup();

    const triggerButton = wrapper.getByRole("button", {
      name: "Create new product",
    });

    await user.click(triggerButton);
    expect(wrapper.getByRole("dialog")).toBeInTheDocument();

    await user.type(wrapper.getByPlaceholderText("Product Name"), "123");

    await user.click(wrapper.getByLabelText("Close"));
    expect(wrapper.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
