import * as React from "react";
import "./styles.scss";
import Rating from "@mui/material/Rating";
import { useRouter } from "next/navigation";

interface IProductItemProps {
  imageUrl: string;
  productName: string;
  price: number;
  oldPrice: number;
  star: number;
  productId: string;
}

const ProductItem: React.FunctionComponent<IProductItemProps> = ({
  imageUrl,
  price,
  productName,
  oldPrice,
  star,
  productId,
}) => {
  const [showAddToCart, setShowAddToCart] = React.useState(false);
  const router = useRouter();
  const viewProductDetail = (productId: string) => {
    router.push(`/product/${productId}`);
  };
  const handleAddToCart = () => {

  }

  return (
    <div
      className="flex flex-col cursor-pointer m-3"
      onClick={() => viewProductDetail(productId)}
    >
      <div className="relative">
        <img
          src={`http://localhost:8080/${imageUrl}`}
          style={{ width: "270px", height: "250px", marginBottom: "10px" }}
          onMouseEnter={() => setShowAddToCart(true)}
          onMouseOut={() => setShowAddToCart(false)}
          className="rounded-md"
        />
        {showAddToCart && (
          <span
            className="bg-black text-white text-center p-1 absolute"
            style={{ width: "270px", bottom: "10px" }}
            onClick={() => handleAddToCart()}
          >
            Add to cart
          </span>
        )}
      </div>
      <div className="flex flex-col mt-3">
        <h3 className="product-name text-xl">{productName}</h3>
        <h4 className="price">
          <span className="text-red-600">${price}</span>
          {oldPrice ? (
            <span className="ml-3 text-gray-400 line-through">${oldPrice}</span>
          ) : (
            ""
          )}
        </h4>
        <Rating name="read-only" value={star} readOnly />
      </div>
    </div>
  );
};

export default ProductItem;
