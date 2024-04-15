import FakeApiProductsClient from "./FakeApiProductsClient";

describe("Products Client", () => {
  it("should return list of products", async () => {
    const fakeApiClient = new FakeApiProductsClient();

    // factory for quicker use
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

    const items = await fakeApiClient.getProducts();

    expect(items).toHaveLength(3);
    expect(items[0].id).toBe(1);
    expect(items[1].id).toBe(2);
    expect(items[2].id).toBe(3);
  });

  it("should create a product with mandatory field", async () => {
    const fakeApiClient = new FakeApiProductsClient();

    const newProduct = await fakeApiClient.createProduct({
      brand: "",
      features: [],
      sizes: [],
      style: "",
      type: "",
      name: "test",
    });

    const getProduct = await fakeApiClient.getProduct(`${newProduct.id}`);

    expect(getProduct.name).toBe("test");
  });

  it("should get single product", async () => {
    const fakeApiClient = new FakeApiProductsClient();

    const newProduct = await fakeApiClient.createProduct({
      brand: "",
      features: [],
      sizes: [],
      style: "",
      type: "",
      name: "test",
    });

    const getProduct = await fakeApiClient.getProduct(`${newProduct.id}`);

    expect(getProduct).not.toBeNull();
    expect(getProduct.name).toBe("test");
  });

  it("should edit a product", async () => {
    const fakeApiClient = new FakeApiProductsClient();

    const newProduct = await fakeApiClient.createProduct({
      brand: "",
      features: [],
      sizes: [],
      style: "",
      type: "",
      name: "test",
    });

    const editedProduct = await fakeApiClient.editProduct({
      id: `${newProduct.id}`,
      brand: "",
      features: [],
      sizes: [],
      style: "",
      type: "",
      name: "super test",
    });

    expect(editedProduct.name).toEqual("super test");
  });

  it("should validate name of the product", async () => {
    const fakeApiClient = new FakeApiProductsClient();

    const newProduct = await fakeApiClient.createProduct({
      brand: "",
      features: [],
      sizes: [],
      style: "",
      type: "",
      name: "test 123",
    });

    const valid = await fakeApiClient.validateProduct({
      id: "1",
      name: "super test",
    });

    expect(valid.message).toEqual("Product name is unique.");

    try {
      await fakeApiClient.validateProduct({
        id: "2",
        name: "test 123",
      });
    } catch (error) {
      expect(error).toEqual({
        error: "Product name is not unique.",
      });
    }
  });
});
