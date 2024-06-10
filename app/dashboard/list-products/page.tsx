"use client";
import ProductItem from "@/components/ProductItem/ProductItem";
import { Product } from "@/types/interface";
import { makeRequest } from "@/utils/axios";
import * as React from "react";
import { useState } from "react";

interface IListProductsProps {}

const ListProducts: React.FunctionComponent<IListProductsProps> = (props) => {
  const [listProducts, setListProducts] = useState<Product[]>([]);
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
      <h1>List products</h1>
      <div style={{ display: "flex" }}>
        {listProducts.map((item) => {
          return (
            <ProductItem
              imageUrl={`http://localhost:8080/${item.imageUrl}`}
              price={item.price}
              productName={item.productName}
              star={item.rating}
            />
          );
        })}
      </div>
    </>
  );
};

export default ListProducts;
