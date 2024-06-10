"use client";

import { useAppContext } from "@/context";
import { LoginResponse, login } from "@/utils/axios";
import * as React from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { useRouter } from "next/navigation";
import InputComponent from "@/components/common/Input";

export interface ILoginProps {}

type Inputs = {
  email: string;
  password: string;
};

export default function Login(props: ILoginProps) {
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
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <FormProvider {...formHandler}>
            <form
              onSubmit={formHandler.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <InputComponent
                id="email"
                name="email"
                placeholder="Email address"
                type="email"
              />

              <InputComponent
                id="password"
                name="password"
                placeholder="Password"
                type="password"
              />

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </FormProvider>

          <p
            className="mt-10 text-center text-sm text-gray-500 cursor-pointer"
            onClick={() => router.push("/forgot-password")}
          >
            Forgot password?{" "}
          </p>
        </div>
      </div>
    </>
  );
}
