/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { apiClient } from "../../api";
import FormField from "./FormField";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters long",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  avatarUrl: z.string().url({
    message: "Please enter a valid URL",
  }),
});

type FormData = z.infer<typeof formSchema>;

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const navigate = useNavigate();
  const onSubmit = async (data: FormData) => {
    //const { email, password, username, avatarUrl } = data;
    try {
      const res = await apiClient.post("/auth/register", data);
      console.log("res:", res);
      const user = res.data;
      navigate("/login");
    } catch (e: any) {
      console.log("e:", e)
      toast.error("There was an error occurred!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-sm shadow-sm p-6 bg-white rounded-lg"
    >
      <div className="space-y-6">
        <FormField label={"Username"} error={errors?.username}>
          <input
            {...register("username")}
            type="text"
            placeholder="Enter your username"
            id="username"
            name="username"
            data-error={errors?.username}
            className=" data-[error]:border-red-500 block w-full border border-gray-300 px-4 py-2 text-gray-600 text-sm rounded focus:ring-0 focus:border-green-400 focus:outline-none placeholder-gray-500"
          />
        </FormField>
        <FormField label={"Email"} error={errors?.email}>
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            id="email"
            name="email"
            data-error={errors?.email}
            className=" data-[error]:border-red-500 block w-full border border-gray-300 px-4 py-2 text-gray-600 text-sm rounded focus:ring-0 focus:border-green-400 focus:outline-none placeholder-gray-500"
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
            className=" data-[error]:border-red-500 block w-full border border-gray-300 px-4 py-2 text-gray-600 text-sm rounded focus:ring-0 focus:border-green-400 focus:outline-none placeholder-gray-500"
          />
        </FormField>
        <FormField label={"Avatar URL"} error={errors?.avatarUrl}>
          <input
            {...register("avatarUrl")}
            type="url"
            id="avatarUrl"
            name="avatarUrl"
            placeholder="Enter your avatar URL"
            data-error={errors?.avatarUrl}
            className=" data-[error]:border-red-500 block w-full border border-gray-300 px-4 py-2 text-gray-600 text-sm rounded focus:ring-0 focus:border-green-400 focus:outline-none placeholder-gray-500"
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
        <span className="text-sm text-gray-600">
          {" "}
          Already have an account?{" "}
        </span>
        <Link
          to="/login"
          className="block text-center text-green-400 hover:text-green-500 transition  font-medium "
        >
          Login
        </Link>
      </div>
      <div className="mt-4">
        <button
          disabled={isSubmitting}
          type="submit"
          className={`cursor-pointer disabled:opacity-70 block w-full py-2 text-center text-white bg-green-400 border border-primary rounded hover:bg-green-500  transition uppercase font-roboto font-medium`}
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
