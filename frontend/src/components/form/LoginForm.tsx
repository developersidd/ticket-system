/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { apiClient } from "../../api";
import FormField from "./FormField";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

type FormData = z.infer<typeof formSchema>;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (data: FormData) => {
    const { email, password } = data;
    try {
      const data = await apiClient.post("/auth/login", {
        email,
        password,
      });
      const user = data.data;
      console.log("user:", user);
      toast.success(
        `Welcome back - ${user?.role?.toUpperCase()}: ${user?.username}!`
      );
      localStorage.setItem("loggedIn", "true");
      navigate("/dashboard/");
    } catch (e: any) {
      console.log("e:", e);
      toast.error("There was an error occurred!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-sm shadow-sm p-6 bg-white rounded-lg"
    >
      <div className="space-y-6">
        <FormField label={"Email"} error={errors?.email}>
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            id="email"
            name="email"
            data-error={errors?.email}
            className=" data-[error]:border-red-500 block w-full border border-gray-300 px-4 py-2 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-400 focus:outline-none placeholder-gray-500"
          />
        </FormField>
        <FormField label={"Password"} error={errors?.password}>
          <input
            {...register("password")}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            data-error={errors?.password}
            className=" data-[error]:border-red-500 block w-full border border-gray-300 px-4 py-2 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-400 focus:outline-none placeholder-gray-500"
          />
        </FormField>
        <div className="">
          {errors?.root?.random && (
            <p className="pt-2 text-red-500 text-sm text-left">
              {errors?.root?.random?.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm text-gray-600"> Don't have an account? </span>
        <Link
          to="/register"
          className="block text-center text-teal-400  font-medium"
        >
          Register
        </Link>
      </div>
      <div className="mt-4">
        <button
          disabled={isSubmitting}
          type="submit"
          className={`cursor-pointer disabled:opacity-70 block w-full py-2 text-center text-white bg-teal-400 border border-primary rounded hover:bg-teal-500  transition uppercase font-roboto font-medium`}
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
