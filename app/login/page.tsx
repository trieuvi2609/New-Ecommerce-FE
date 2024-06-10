"use client";

import { useAppContext } from "@/context";
import { LoginResponse, login } from "@/utils/axios";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';

export interface ILoginProps {}

type Inputs = {
  email: string;
  password: string;
};

export default function Login(props: ILoginProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { loginUser } = useAppContext();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response: LoginResponse = await login(data.email, data.password);
      console.log("response");
      if (response.statusCode === 200) {
        loginUser({
          isAuth: true,
          userName: response.userName,
        });
        router.push('/')
      }
      // Handle successful login here
    } catch (err) {
      console.log("Login failed:", err);
      // Handle login failure here
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
          Create an account
        </h1>
        <h1>Enter your details below</h1>
      </span>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
        }}
      >
        <input placeholder="email" {...register("email", { required: true })} />

        <input
          type="password"
          placeholder="password"
          {...register("password", { required: true })}
        />
        {errors.email && <span>This field is required</span>}
        {errors.password && <span>This field is required</span>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
