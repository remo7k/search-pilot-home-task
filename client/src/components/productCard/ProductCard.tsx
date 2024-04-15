import { Product } from "../../api/products/model/Product";
import s from "./style.module.less";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
  isLoading?: boolean;
}

// ux wise id and features don't make enough impact for a user to display it in the card

const ProductCard = ({ product }: Props) => {
  return (
    <li className={s.card}>
      <Link to={`/products/${product.id}`}>
        <img
          src="https://placehold.co/320x140"
          alt={`product ${product.name} image`}
        />
        <div className={s.name}>{product.name}</div>
        <div className={s.subheader}>
          <span>{product.brand}</span>
          <span>{product.type}</span>
          {product?.style && <span>{product.style}</span>}
        </div>

        <div className={s.sizeWrapper}>
          {product.sizes?.map((it) => (
            <span key={it} className={s.size}>
              {it}
            </span>
          ))}
        </div>
        {/*<span>{product.id}</span>*/}
        {/*<span>{product.features}</span>*/}
      </Link>
    </li>
  );
};

export default ProductCard;
