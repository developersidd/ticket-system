/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { apiClient } from "../../api";
import { IUserContext } from "../../context/user.context";
import useUserContext from "../../hooks/useUserContext";
import FormField from "./FormField";

const formSchema = z.object({
  title: z.string().min(8, {
    message: "Title must be at least 8 characters long",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters long",
  }),
  // create optional schema for status and adminResponse
  status: z.string().optional(),
  adminResponse: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const AddEditTicketForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const { state } = useUserContext() as IUserContext;

  const { id } = useParams() || {};
  const isEditing = !!id;
  const navigate = useNavigate();
  // check if we are editing or adding a ticket
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const {
          data: { data },
        } = await apiClient.get(`/tickets/${id}`);
        const { title, description, status, adminResponse } = data || {};
        setValue("title", title);
        setValue("description", description);
        console.log("status:", status?.toLowerCase());
        setValue("status", status?.toLowerCase());
        setValue("adminResponse", adminResponse);
      } catch (e: any) {
        return toast.error("There was an error occurred!");
      }
    };
    if (id) {
      fetchTicket();
    }
  }, [id, setValue]);

  // Add or edit ticket
  const onSubmit = async (data: FormData) => {
    try {
      if (isEditing) {
        await apiClient.patch(`/tickets/${id}`, data);
        toast.success("Ticket updated successfully!");
        navigate("/tickets");
        return;
      }
      await apiClient.post("/tickets/create", data);
      toast.success("Ticket created successfully!");
      reset();
      navigate("/tickets");
    } catch (e: any) {
      return toast.error("There was an error occurred!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-md shadow-sm p-6 bg-white rounded-lg"
    >
      <div className="space-y-6">
        {/* create title, description field */}
        <FormField label={"Title"} error={errors?.title}>
          <input
            {...register("title")}
            type="text"
            id="title"
            name="title"
            placeholder="Enter ticket title"
            data-error={errors?.title}
            className=" data-[error]:border-red-500 block w-full border border-gray-300 px-4 py-2 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-400 focus:outline-none placeholder-gray-500"
          />
        </FormField>
        <FormField label={"Description"} error={errors?.description}>
          <textarea
            {...register("description")}
            id="description"
            name="description"
            placeholder="Enter ticket description"
            data-error={errors?.description}
            className="data-[error]:border-red-500 block w-full border border-gray-300 px-4 py-2 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-400 focus:outline-none placeholder-gray-500"
          ></textarea>
        </FormField>
      </div>

      {state?.role === "ADMIN" && isEditing && (
        <div className="mt-6 space-y-6">
          <FormField label={"Status"}>
            <select
              {...register("status")}
              id="status"
              name="status"
              className="block w-full border border-gray-300 px-4 py-2 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-400 focus:outline-none placeholder-gray-500"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </FormField>
          <FormField label={"Admin Response"}>
            <textarea
              {...register("adminResponse")}
              id="adminResponse"
              name="adminResponse"
              placeholder="Enter admin response"
              className="block w-full border border-gray-300 px-4 py-2 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-400 focus:outline-none placeholder-gray-500"
            ></textarea>
          </FormField>
        </div>
      )}
      <div className="mt-4">
        <button
          disabled={isSubmitting}
          type="submit"
          className={`cursor-pointer disabled:opacity-70 block w-full py-2 text-center text-white bg-teal-400 border border-primary rounded hover:bg-teal-500  transition uppercase font-roboto font-medium`}
        >
          {isEditing ? "Edit" : "Add"} Ticket
        </button>
      </div>
    </form>
  );
};

export default AddEditTicketForm;
