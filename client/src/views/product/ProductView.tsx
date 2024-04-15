import s from "./style.module.less";
import Form, { ProductForm } from "../../components/form/Form";
import { useParams } from "react-router-dom";
import {
  useEditProduct,
  useGetProduct,
} from "../../api/products/hooks/productsQuery";
import { FormEvent } from "react";
import { ProductEditRequest } from "../../api/products/model/ProductEditRequest";

const ProductView = () => {
  const { id } = useParams();
  const { data } = useGetProduct(id);
  const { mutateAsync: editProduct } = useEditProduct();

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    form: ProductForm,
  ) => {
    e.preventDefault();

    const request: ProductEditRequest = {
      id: id,
      name: form.name,
      type: form.type,
      sizes: [form.size],
      features: [form.features],
      brand: form.brand,
      style: form.style,
    };

    try {
      await editProduct(request);
    } catch (e) {
      console.error("form error");
    }
  };

  return (
    <main className={s.formWrapper}>
      <Form
        handleSubmit={handleSubmit}
        defaultValues={data}
        buttonText="edit"
      />
    </main>
  );
};

export default ProductView;
