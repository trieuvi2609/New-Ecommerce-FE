"use client";

import * as React from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
  Controller,
} from "react-hook-form";
import { useRouter } from "next/navigation";
import { makeRequest } from "@/utils/axios";
import SimpleDialog from "@/components/common/Dialog";
import { useState } from "react";
import { Caterogies } from "@/types/interface";
import InputComponent from "@/components/common/Input";
import clsx from "clsx";
import SelectComponent from "../common/Select";
import { CATEGORIES } from "@/utils/constant";

export interface ICreateProductProps {
  onClose: () => void;
  onOk?: () => void;
  openDialog: boolean;
  onSubmitSuccess?: () => void;
  onSubmitFailed?: () => void;
}

type InputsProduct = {
  productName: string;
  price: number;
  oldPrice: number;
  rating: number;
  quantityInStock: number;
  imageUrl: FileList;
  description: string;
  category: typeof Caterogies;
};

export default function CreateProduct({
  onClose,
  onOk,
  openDialog,
  onSubmitFailed,
  onSubmitSuccess,
}: ICreateProductProps) {
  const formHandler = useForm<InputsProduct>();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formHandler;
  const router = useRouter();

  const handleCloseDialog = () => {
    onClose();
  };

  const handleOkDialog = () => {
    formHandler.handleSubmit(onSubmit)();
  };

  const onSubmit: SubmitHandler<InputsProduct> = async (data) => {
    const {
      description,
      imageUrl,
      price,
      oldPrice,
      productName,
      quantityInStock,
      rating,
      category,
    } = data;
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price.toString());
    formData.append("oldPrice", oldPrice.toString());
    formData.append("quantityInStock", quantityInStock.toString());
    formData.append("description", description);
    formData.append("rating", rating.toString());
    formData.append("category", category.toString());
    if (imageUrl && imageUrl.length > 0) {
      formData.append("image", imageUrl[0]); // Only use the first file
    } else {
      console.error("No file selected");
    }
    try {
      const response = await makeRequest(
        "/admin/create-product",
        "post",
        {},
        formData,
        {
          "Content-Type": "multipart/form-data",
        }
      );
      console.log("response", response.statusCode);
      if (response.statusCode === 201) {
        onClose();
        onSubmitSuccess!()
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <SimpleDialog
        open={openDialog}
        okText="Submit"
        cancelText="Cancel"
        onClose={handleCloseDialog}
        onOk={handleOkDialog}
      >
        <FormProvider {...formHandler}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <InputComponent
              id="productName"
              name="productName"
              placeholder="Product Name"
            />
            {errors.productName && <span>This field is required</span>}

            <SelectComponent
              id="category"
              name="category"
              placeholder="Category"
              options={CATEGORIES}
            />
            {errors.category && <span>This field is required</span>}
            <InputComponent
              id="price"
              name="price"
              placeholder="Price"
              type="number"
            />
            {errors.price && <span>This field is required</span>}

            <InputComponent
              id="oldPrice"
              name="oldPrice"
              placeholder="Old Price"
              type="number"
            />
            {errors.oldPrice && <span>This field is required</span>}

            <div className="mt-2">
              <Controller
                name="imageUrl"
                control={control}
                render={({ field }) => (
                  <input
                    id="imageUrl"
                    type="file"
                    className={clsx(
                      "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    )}
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                )}
                rules={{ required: true }}
              />
              {errors.imageUrl && <span>This field is required</span>}
            </div>

            <InputComponent
              id="description"
              name="description"
              placeholder="Description"
            />
            {errors.description && <span>This field is required</span>}

            <InputComponent
              id="rating"
              name="rating"
              placeholder="Rating"
              type="number"
            />
            {errors.rating && <span>This field is required</span>}

            <InputComponent
              id="quantityInStock"
              name="quantityInStock"
              placeholder="Quantity In Stock"
              type="number"
            />
            {errors.quantityInStock && <span>This field is required</span>}
          </form>
        </FormProvider>
      </SimpleDialog>
    </>
  );
}
