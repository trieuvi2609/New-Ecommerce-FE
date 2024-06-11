"use client";
import InputComponent from "@/components/common/Input";
import SelectComponent from "@/components/common/Select";
import { useAppContext } from "@/context";
import { LoginResponse, SignUpResponse, login, signup } from "@/utils/axios";
import { RoleOptions } from "@/utils/constant";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface IAuthFormProps {
  type: "login" | "signup";
}

type Inputs = {
  email: string;
  password: string;
  userName?: string;
  role?: string;
};

const AuthForm: React.FunctionComponent<IAuthFormProps> = ({ type }) => {
  const router = useRouter();
  const formHandler = useForm<Inputs>();
  const { loginUser } = useAppContext();

  const handleLogin: SubmitHandler<Inputs> = async (data) => {
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

  const handleSignUp: SubmitHandler<Inputs> = async (data) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
        userName: data.userName as string,
        role: data.role as string,
      };

      const response: SignUpResponse = await signup(payload);

      if (response.statusCode === 201) {
        router.push("/login");
      }
    } catch (err) {
      console.log("Login failed:", err);
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <FormProvider {...formHandler}>
        <form onSubmit={formHandler.handleSubmit(type === "login" ? handleLogin : handleSignUp)} className="space-y-6">
          {type === "signup" && <InputComponent id="userName" name="userName" placeholder="User Name" type="text" />}

          <InputComponent id="email" name="email" placeholder="Email address" type="email" />

          <InputComponent id="password" name="password" placeholder="Password" type="password" />

          {type === "signup" && (
            <SelectComponent id="role" name="role" placeholder="Please select your role" options={RoleOptions} />
          )}

          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {type === "login" ? "Sign in" : "Sign up"}
            </button>
          </div>
        </form>
      </FormProvider>

      {type === "login" && (
        <>
          <p
            className="mt-10 text-center text-sm text-gray-500 cursor-pointer"
            onClick={() => router.push("/forgot-password")}>
            Forgot password
          </p>
          <p className="mt-10 text-center text-sm text-gray-500 cursor-pointer">
            Don&apos;t have an account?
            <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Create a new one.
            </a>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthForm;
