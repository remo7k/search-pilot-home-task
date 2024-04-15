import React, { createContext, useContext } from "react";
import ProductsClient from "../api/products/client/ProductsClient";

interface Props {
  client: ProductsClient;
  children: React.ReactNode;
}

const apiClientContext = createContext<ProductsClient>(null);

export const ApiClientProvider = ({ children, client }: Props) => {
  return (
    <apiClientContext.Provider value={client}>
      {children}
    </apiClientContext.Provider>
  );
};

export const useApiClient = () => {
  const context = useContext(apiClientContext);

  if (!context) {
    throw "No api client found. Try wrapping your component with <ApiClientProvider client={someClient}>";
  }

  return context;
};
