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
      const response = await makeRequest("/admin/products", "get");
      if (response.statusCode === 200) {
        setListProducts(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex">
        <h1>List products</h1>
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

export default ListProducts;
