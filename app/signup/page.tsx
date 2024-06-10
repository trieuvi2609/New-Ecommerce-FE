"use client";

import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { makeRequest } from "@/utils/axios";
import { useRouter } from 'next/navigation';


interface ISignUpProps {}

type Inputs = {
  email: string;
  userName: string;
  password: string;
};

const SignUp: React.FunctionComponent<ISignUpProps> = (props) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      await makeRequest(
        "http://localhost:8080/signup",
        "put",
        {},
        data,
        {},
        (res) => {
          router.push('/login')
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Create an account</h1>
      <h1>Enter your details below</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input placeholder="email" {...register("email", { required: true })} />

        <input
          placeholder="userName"
          {...register("userName", { required: true })}
        />

        <input
          placeholder="password"
          {...register("password", { required: true })}
        />
        {errors.email && <span>This field is required</span>}
        {errors.userName && <span>This field is required</span>}
        {errors.password && <span>This field is required</span>}

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignUp;
