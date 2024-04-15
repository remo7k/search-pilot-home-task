import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.less";
import Layout from "./components/layout/Layout";
import NotFoundView from "./views/notFound/NotFoundView";
import Home from "./views/home/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProductView from "./views/product/ProductView";
import { ApiClientProvider } from "./providers/ApiClientProvider";
import ProductsClient from "./api/products/client/ProductsClient";

const queryClient = new QueryClient();

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundView />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products/:id",
        element: <ProductView />,
      },
    ],
  },
]);

interface Props {
  apiClient: ProductsClient;
}

const App = ({ apiClient }: Props) => {
  return (
    <ApiClientProvider client={apiClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ApiClientProvider>
  );
};

export default App;
