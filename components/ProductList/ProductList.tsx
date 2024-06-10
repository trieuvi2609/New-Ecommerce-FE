"use client";

import { Product } from "@/types/interface";
import * as React from "react";
import ProductItem from "../ProductItem/ProductItem";
import "./styles.scss";
import { makeRequest } from "@/utils/axios";

interface IProductListProps {}

const ProductList: React.FunctionComponent<IProductListProps> = (props) => {
  const [listProducts, setListProducts] = React.useState<Product[]>([]);
  React.useEffect(() => {
    console.log("a");
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
      {listProducts.map((item: Product) => (
        <ProductItem
          imageUrl={item.imageUrl}
          price={item.price}
          productName={item.productName}
          star={item.rating}
        />
      ))}
    </>
  );
};

export default ProductList;
