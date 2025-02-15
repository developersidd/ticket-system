/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { apiClient } from "../../api";
import FormField from "./FormField";
// import file type from cloudinary
// import { File } from "zod";
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 5000000; // 5MB

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
  avatar: z
    .any()
    .refine((file) => file[0]?.name, "File is required")
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files[0]?.type),
      "Only .png, .jpg, .jpeg formats are supported."
    )
    .refine((files) => files[0]?.size < MAX_FILE_SIZE, "Max size is 5MB."),
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
    console.log("data:", data);
    //const { email, password, username, avatarUrl } = data;
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "avatar") {
          formData.append(key, value[0]);
        } else {
          formData.append(key, value);
        }
      });
      const res = await apiClient.post("/auth/register", formData);
      console.log("res:", res);
      const user = res.data;
      navigate("/login");
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
        <FormField label={"Username"} error={errors?.username}>
          <input
            {...register("username")}
            type="text"
            placeholder="Enter your username"
            id="username"
            name="username"
            data-error={errors?.username}
            className=" data-[error]:border-red-500 block w-full border border-gray-300 px-4 py-2 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-400 focus:outline-none placeholder-gray-500"
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

        <FormField label={"Avatar"} error={errors?.avatar}>
          <input
            {...register("avatar")}
            type="file"
            id="avatar"
            name="avatar"
            data-error={errors?.avatar}
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
        <span className="text-sm text-gray-600">
          {" "}
          Already have an account?{" "}
        </span>
        <Link
          to="/login"
          className="block text-center text-teal-400 hover:text-teal-500 transition  font-medium "
        >
          Login
        </Link>
      </div>
      <div className="mt-4">
        <button
          disabled={isSubmitting}
          type="submit"
          className={`cursor-pointer disabled:opacity-70 block w-full py-2 text-center text-white bg-teal-400 border border-primary rounded hover:bg-teal-500  transition uppercase font-roboto font-medium`}
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
