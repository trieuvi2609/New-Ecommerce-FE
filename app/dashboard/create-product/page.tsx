"use client";

import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { makeRequest } from "@/utils/axios";
import SimpleDialog from "@/components/common/Dialog";
import { useState } from "react";
import { Caterogies } from "@/types/interface";

export interface ICreateProductProps {}

type InputsProduct = {
  productName: string;
  price: number;
  oldPrice: number;
  rating: number;
  quantityInStock: number;
  imageUrl: string;
  description: string;
  category: typeof Caterogies
};

export default function CreateProduct(props: ICreateProductProps) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOkDialog = () => {
    setOpenDialog(false);
    router.push("./list-products");
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputsProduct>();
  const onSubmit: SubmitHandler<InputsProduct> = async (data) => {
    const {
      description,
      imageUrl,
      price,
      oldPrice,
      productName,
      quantityInStock,
      rating,
      category
    } = data;
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price.toString());
    formData.append("oldPrice", oldPrice.toString());
    formData.append("quantityInStock", quantityInStock.toString());
    formData.append("description", description);
    formData.append("rating", rating.toString());
    formData.append("category", "Technology")
    if (imageUrl && imageUrl.length > 0) {
      formData.append("image", imageUrl[0]); // Only use the first file
    } else {
      console.error("No file selected");
    }
    try {
      const response = await makeRequest(
        "/create-product",
        "post",
        {},
        formData,
        {
          "Content-Type": "multipart/form-data",
        }
      );
      console.log("response", response.statusCode);
      if (response.statusCode === 201) {
        console.log("true");
        setOpenDialog(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span>
        <h1
          style={{
            fontSize: "30px",
          }}
        >
          Create new product
        </h1>
        <h1>Enter your product detail below</h1>
      </span>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
        }}
      >
        <input
          placeholder="Product Name"
          {...register("productName", { required: true })}
        />

        <input
          placeholder="price"
          {...register("price", { required: true })}
          type="number"
        />
        <input
          placeholder="oldPrice"
          {...register("oldPrice", { required: true })}
          type="number"
        />

        <input
          placeholder="imageUrl"
          {...register("imageUrl", { required: true })}
          type="file"
        />
        <input
          placeholder="description"
          {...register("description", { required: true })}
        />
        <input
          placeholder="rating"
          type="number"
          {...register("rating", { required: true })}
        />
        <input
          type="number"
          placeholder="quantityInStock"
          {...register("quantityInStock", { required: true })}
        />

        {errors.price && <span>This field is required</span>}
        {errors.productName && <span>This field is required</span>}

        <button type="submit">Submit</button>
      </form>

      <SimpleDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onOk={handleOkDialog}
      >
        Created product. Do you want to navigate to list your products
      </SimpleDialog>
    </div>
  );
}
