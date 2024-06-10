"use client";

import { Product } from "@/types/interface";
import * as React from "react";
import ProductItem from "../ProductItem/ProductItem";
import "./styles.scss";
import { makeRequest } from "@/utils/axios";

interface IProductListProps {
  title: string;
}

const ProductList: React.FunctionComponent<IProductListProps> = ({ title }) => {
  const [listProducts, setListProducts] = React.useState<Product[]>([]);
  React.useEffect(() => {
    getProductsAdmin();
  }, []);
  const getProductsAdmin = async () => {
    try {
      const response = await makeRequest("/products", "get");
      if (response.statusCode === 200) {
        setListProducts(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-xl text-red-600 font-bold m-3 ">{title}</h1>
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
      </div>
    </>
  );
};

export default ProductList;
