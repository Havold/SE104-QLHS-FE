import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { makeRequest } from "../../axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Tạo schema
const schema = z.object({
  value: z.coerce.number().min(1, { message: "School year is required!" }),
});

const SchoolYearForm = ({ data, type = "create", setOpenForm }) => {
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
    mutationFn: ({ newSchoolYear, type }) => {
      console.log(newSchoolYear);
      if (type === "create")
        return makeRequest
          .post("/school-years", { value: newSchoolYear })
          .then((res) => res.data);
      else
        return makeRequest
          .put(`/school-years/${data.id}`, { value: newSchoolYear })
          .then((res) => res.data);
    },
    onSuccess: (data) => {
      setOpenForm(false);
      queryClient.invalidateQueries({ queryKey: ["school-years"] });
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
      const newSchoolYear = data.value;
      mutation.mutate({ newSchoolYear, type });
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
        {type === "create"
          ? "Create a new school year"
          : "Update this school year"}
      </h1>
      <div className="flex flex-col w-full gap-1">
        <label
          className="capitalize text-[12px] text-gray-500"
          htmlFor={"schoolYear"}
        >
          School Year
        </label>
        <input
          key="schoolYear"
          className="text-[14px] p-2 h-[40px] border border-gray-400 outline-webSkyBold caret-webSkyBold transition-colors rounded-md"
          id="schoolYear"
          defaultValue={data?.value}
          {...register("value")}
        />
        {errors.value?.message ? (
          <span className="text-[10px] text-red-600">
            {errors.value.message}
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

export default SchoolYearForm;
