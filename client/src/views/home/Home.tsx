import ProductCard from "../../components/productCard/ProductCard";
import { useGetProducts } from "../../api/products/hooks/productsQuery";
import s from "./style.module.less";
import { Product } from "../../api/products/model/Product";

const Home = () => {
  const { data: products, isLoading } = useGetProducts();

  // Skeleton, passing isLoading to ProductCard
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className={s.gridPlacement}>
      <ul className={s.productsWrapper}>
        {products?.map((it: Product) => {
          return <ProductCard key={it.id} product={it} isLoading={isLoading} />;
        })}
      </ul>
    </main>
  );
};

export default Home;
