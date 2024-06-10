"use client";
import InputComponent from "@/components/common/Input";
import { useAppContext } from "@/context";
import { LoginResponse, login } from "@/utils/axios";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface IAuthFormProps {
  type: "login" | "signup";
}

type Inputs = {
  email: string;
  password: string;
};

const AuthForm: React.FunctionComponent<IAuthFormProps> = ({ type }) => {
  const router = useRouter();
  const formHandler = useForm<Inputs>();
  const { loginUser } = useAppContext();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("data", data);
    try {
      const response: LoginResponse = await login(data.email, data.password);
      console.log("response");
      if (response.statusCode === 200) {
        loginUser({
          isAuth: true,
          userName: response.userName,
        });
        router.push("/");
      }
      // Handle successful login here
    } catch (err) {
      console.log("Login failed:", err);
      // Handle login failure here
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <FormProvider {...formHandler}>
        <form onSubmit={formHandler.handleSubmit(onSubmit)} className="space-y-6">
          <InputComponent id="email" name="email" placeholder="Email address" type="email" />

          <InputComponent id="password" name="password" placeholder="Password" type="password" />

          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign in
            </button>
          </div>
        </form>
      </FormProvider>

      <p
        className="mt-10 text-center text-sm text-gray-500 cursor-pointer"
        onClick={() => router.push("/forgot-password")}>
        Forgot password
      </p>
    </div>
  );
};

export default AuthForm;
