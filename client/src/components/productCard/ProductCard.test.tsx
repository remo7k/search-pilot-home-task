import ProductCard from "./ProductCard";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("product card", () => {
  const product = {
    id: 1,
    name: `Velocity Runner Running Shoes`,
    type: `footwear`,
    sizes: ["US 7", "US 8", "US 9", "US 10"],
    features: [
      "Shock-absorbing sole",
      "Breathable mesh upper",
      "Cushioned insole",
    ],
    brand: "RunXpert",
    style: "Trail running shoes",
  };

  it("should render the card", async () => {
    const wrapper = render(
      <BrowserRouter>
        <ProductCard product={product} />
      </BrowserRouter>,
    );

    expect(
      wrapper.getByAltText(`product ${product.name} image`),
    ).toBeInTheDocument();
    expect(wrapper.getByText(product.name)).toBeInTheDocument();
    expect(wrapper.getByText(product.type)).toBeInTheDocument();
    expect(wrapper.getByText(product.sizes[0])).toBeInTheDocument();
    expect(wrapper.getByText(product.brand)).toBeInTheDocument();
    expect(wrapper.getByText(product.style)).toBeInTheDocument();
  });

  it("links to the correct product page", () => {
    const wrapper = render(
      <BrowserRouter>
        <ProductCard product={product} />
      </BrowserRouter>,
    );

    expect(wrapper.getByRole("link")).toHaveAttribute(
      "href",
      `/products/${product.id}`,
    );
  });
});
