"use client";

import { Product } from "@/types/interface";
import * as React from "react";
import ProductItem from "../ProductItem/ProductItem";
import "./styles.scss";
import { makeRequest } from "@/utils/axios";
import Skeleton from "../common/Skeleton";
import Spinner from "../common/Spinner";

interface IProductListProps {
  title: string;
}

const ProductList: React.FunctionComponent<IProductListProps> = ({ title }) => {
  const [listProducts, setListProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    setIsLoading(true);
    getProductsAdmin();
  }, []);
  const getProductsAdmin = async () => {
    try {
      const response = await makeRequest("/products", "get");
      if (response.statusCode === 200) {
        setListProducts(response.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-xl text-red-600 font-bold m-3 ">{title}</h1>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex flex-row">
            {listProducts.map((item: Product) => (
              <ProductItem
                oldPrice={item.oldPrice}
                imageUrl={item.imageUrl}
                price={item.price}
                productName={item.productName}
                star={item.rating}
                key={item.productId}
                productId={item.productId}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
