import ProductItem from "@/components/ProductItem/ProductItem";
import ProductList from "@/components/ProductList/ProductList";
import { Product } from "@/types/interface";
import * as React from "react";

export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  
  return (
    <div>
      <div className="product-list">
        <ProductList />
      </div>
    </div>
  );
}
