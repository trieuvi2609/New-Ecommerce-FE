"use client"
import * as React from "react";
import "./styles.scss";
import { makeRequest } from "@/utils/axios";
import { useRouter } from "next/navigation";

interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
    const router = useRouter()
  const getMyProduct = async () => {
    router.push('/dashboard/list-products')
  };
  return (
    <>
      <div style={{ display: "flex", padding: "20%" }}>
        <div className="list-product" onClick={getMyProduct}>
          Watch the list of product
        </div>
        <div className="create-product" onClick={() => router.push('/dashboard/create-product')}>Create new product</div>
      </div>
    </>
  );
};

export default Dashboard;
