import ProductItem from "@/components/ProductItem/ProductItem";
import ProductCategory from "@/components/ProductList/ProductCategory";
import counterSlice, { decrement, increment } from "@/redux/features/counterSlice/counterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Product } from "@/types/interface";
import * as React from "react";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {

  return (
    <div>
      <div className="product-list">
        <ProductCategory title="Today's" />
      </div>
    </div>
  );
}
