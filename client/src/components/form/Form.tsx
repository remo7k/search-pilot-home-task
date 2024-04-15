import InputText from "./input/Input";
import SelectInput from "./select/Select";
import s from "./style.module.less";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Product } from "../../api/products/model/Product";
import { useValidateProductName } from "../../api/products/hooks/productsQuery";
import { ProductValidateNameRequest } from "../../api/products/model/ProductValidateNameRequest";

const FOOTWEAR_SIZES = ["US 7", "US 8", "US 9", "US 10"];
const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL"];
const PRODUCT_TYPES = ["footwear", "activewear", "outerwear", "dress", "top"];

type FootwearSizes = (typeof FOOTWEAR_SIZES)[number];
type ClothingSizes = (typeof CLOTHING_SIZES)[number];
type ProductTypes = (typeof PRODUCT_TYPES)[number];

export interface ProductForm {
  name: string;
  type: ProductTypes;
  size: FootwearSizes | ClothingSizes;
  features: string;
  brand: string;
  style?: string;
  materials?: string;
  colour?: string;
  neckline?: string;
}

interface Props {
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    form: ProductForm,
  ) => Promise<void>;
  defaultValues?: Product;
  buttonText: string;
}

const emptyState: ProductForm = {
  name: "",
  type: "",
  size: "",
  features: "",
  brand: "",
  style: undefined,
  materials: undefined,
  colour: undefined,
  neckline: undefined,
};

const Form = ({ handleSubmit, defaultValues, buttonText }: Props) => {
  const [form, setForm] = useState<ProductForm>(emptyState);

  const { mutateAsync: isNameValid, isError: isNameValidError } =
    useValidateProductName();

  useEffect(() => {
    if (defaultValues) {
      setForm({
        name: defaultValues.name,
        type: defaultValues.type,
        // type in api is string[], could be multiselect
        size: defaultValues.sizes[0],
        features: defaultValues.features[0],
        brand: defaultValues.brand,
        style: defaultValues.style,
        colour: defaultValues.colour,
        materials: defaultValues.materials,
        neckline: defaultValues.neckline,
      });
    }
  }, [defaultValues]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeSelect = (name: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getProductSize = () => {
    if (form.type === "footwear") {
      return FOOTWEAR_SIZES;
    }

    return CLOTHING_SIZES;
  };

  const onHandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validateRequest: ProductValidateNameRequest = { name: form.name };

    if (defaultValues) {
      validateRequest.id = `${defaultValues.id}`;
    }

    // better error handling, could be displayed in the form
    try {
      await isNameValid(validateRequest);
      await handleSubmit(e, form);
    } catch (e) {
      console.error(e.response?.data?.error);
      return;
    }
  };

  const getInputText = (type: string) => {
    switch (type) {
      case "footwear": {
        return (
          <InputText
            name="style"
            label="Product Style"
            onChange={handleChange}
            placeholder="Product Style"
            value={defaultValues?.style}
          />
        );
      }

      case "outerwear": {
        return (
          <InputText
            name="materials"
            label="Product Materials"
            onChange={handleChange}
            placeholder="Product Materials"
            value={defaultValues?.materials}
          />
        );
      }

      case "dress": {
        return (
          <InputText
            name="colour"
            label="Product Colour"
            onChange={handleChange}
            placeholder="Product Colour"
            value={defaultValues?.colour}
          />
        );
      }

      case "top": {
        return (
          <InputText
            name="neckline"
            label="Product Neckline"
            onChange={handleChange}
            placeholder="Product Neckline"
            value={defaultValues?.neckline}
          />
        );
      }
    }
  };

  return (
    <form className={s.form} onSubmit={onHandleSubmit} data-qa="form">
      <InputText
        name="name"
        label="Product Name"
        onChange={handleChange}
        placeholder="Product Name"
        value={form.name}
        required
        isError={isNameValidError}
        errorText="Product name must be unique."
      />

      <SelectInput
        options={PRODUCT_TYPES}
        placeholder="Product Types"
        name="type"
        onChange={handleChangeSelect}
        value={form.type}
      />

      {form.type && (
        <>
          <SelectInput
            options={getProductSize()}
            placeholder="Product Size"
            name="size"
            onChange={handleChangeSelect}
            value={form.size}
          />
          <InputText
            name="brand"
            label="Product Brand"
            onChange={handleChange}
            placeholder="Product Brand"
            value={form.brand}
          />
          <InputText
            name="features"
            label="Product Features"
            onChange={handleChange}
            placeholder="Product Features"
            value={form.features}
          />
          {getInputText(form.type)}
        </>
      )}

      <button className={s.submit} type="submit">
        {buttonText}
      </button>
    </form>
  );
};

export default Form;
