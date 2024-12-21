import { zodResolver } from "@hookform/resolvers/zod";
import { PrintSharp } from "@mui/icons-material";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { makeRequest } from "../../axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Tạo schema
const schema = z.object({
  name: z.string().min(1, { message: "Name is required!" }),
});

const SubjectForm = ({ data, type = "create", setOpenForm }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const btnColor =
    type === "create"
      ? "bg-webYellow hover:bg-webYellowLight"
      : "bg-webSkyBold hover:bg-webSky";

  const mutation = useMutation({
    mutationFn: ({ newSubject, type }) => {
      if (type === "create")
        return makeRequest
          .post("/subjects", { name: newSubject })
          .then((res) => res.data);
      else
        return makeRequest
          .put(`/subjects/${data.id}`, { name: newSubject })
          .then((res) => res.data);
    },
    onSuccess: (data) => {
      setOpenForm(false);
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      toast(data, { type: "success" });
    },
    onError: (error) => {
      toast(error.response.data, {
        type: "error",
      });
    },
  });

  const onValid = async (data) => {
    try {
      const newSubject = data.name;
      mutation.mutate({ newSubject, type });
    } catch (error) {
      if (error) {
        toast(error.response.data, {
          type: "error",
        });
      }
    }
  };
  const onSubmit = handleSubmit(onValid);

  return (
    <form
      className="h-full flex flex-col justify-center gap-4"
      onSubmit={onSubmit}
    >
      <h1 className="text-[18px] font-semibold ">
        {type === "create" ? "Create a new subject" : "Update this subject"}
      </h1>
      <div className="flex flex-col w-full gap-1">
        <label
          className="capitalize text-[12px] text-gray-500"
          htmlFor={"name"}
        >
          Subject's name
        </label>
        <input
          key="name"
          className="text-[14px] p-2 h-[40px] border border-gray-400 outline-webSkyBold caret-webSkyBold transition-colors rounded-md"
          id="name"
          defaultValue={data?.name}
          {...register("name")}
        />
        {errors.name?.message ? (
          <span className="text-[10px] text-red-600">
            {errors.name.message}
          </span>
        ) : (
          <></>
        )}
      </div>
      <button
        className={`text-[18px] w-full p-2 rounded-md ${btnColor} transition-colors text-white`}
      >
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default SubjectForm;
