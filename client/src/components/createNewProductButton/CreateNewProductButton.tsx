import s from "./style.module.less";
import * as Dialog from "@radix-ui/react-dialog";
import Form, { ProductForm } from "../form/Form";
import { useCreateProduct } from "../../api/products/hooks/productsQuery";
import { FormEvent, useEffect, useState } from "react";
import { ProductCreateRequest } from "../../api/products/model/ProductCreateRequest";
import { Cross2Icon } from "@radix-ui/react-icons";

// test for the component

const CreateNewProductButton = () => {
  const { mutateAsync: createProduct, isSuccess } = useCreateProduct();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess]);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    form: ProductForm,
  ) => {
    e.preventDefault();

    console.log('clicked')

    const request: ProductCreateRequest = {
      name: form.name,
      type: form.type,
      sizes: [form.size],
      features: [form.features],
      brand: form.brand,
      style: form.style,
    };

    console.log(form);

    try {
      await createProduct(request);
    } catch (e) {
      console.error(e.response.data.error);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger onClick={handleOpen} className={s.button}>
        Create new product
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content
          className={s.content}
          onInteractOutside={handleOpen}
          onEscapeKeyDown={handleOpen}
        >
          <Dialog.Title> Create new product </Dialog.Title>
          <Form handleSubmit={handleSubmit} buttonText="create" />
          <Dialog.Close onClick={handleOpen} className={s.close} asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateNewProductButton;
