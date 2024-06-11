import ProductCategory from "@/components/ProductList/ProductCategory";
import * as React from "react";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {

  return (
    <div>
        <ProductCategory title="Today's" />
    </div>
  );
}
