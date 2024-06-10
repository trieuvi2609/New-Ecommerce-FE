import * as React from "react";
import './styles.scss'

interface IProductItemProps {
  imageUrl: string;
  productName: string;
  price: number;
  star: number;
}

const ProductItem: React.FunctionComponent<IProductItemProps> = ({
  imageUrl,
  price,
  productName,
  star,
}) => {
  return (
    <>
      <div className="product-item-wrapper">
        <img src={imageUrl} style={{width: '100px', height: 'auto'}}/>
        <div className="d-flex flex-column">
            <h3 className="product-name">{productName}</h3>
            <h4 className="price">{price}</h4>
            <h4 className="star">{star}</h4>
        </div>
      </div>

    </>
  );
};

export default ProductItem;
