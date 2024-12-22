import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { makeRequest } from "../../axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Tạo schema
const schema = z.object({
  level: z.coerce.number().min(1, { message: "Grade is required!" }),
});

const GradeForm = ({ data, type = "create", setOpenForm }) => {
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
    mutationFn: ({ newGrade, type }) => {
      console.log(newGrade);
      if (type === "create")
        return makeRequest
          .post("/grades", { level: newGrade })
          .then((res) => res.data);
      else
        return makeRequest
          .put(`/grades/${data.id}`, { level: newGrade })
          .then((res) => res.data);
    },
    onSuccess: (data) => {
      setOpenForm(false);
      queryClient.invalidateQueries({ queryKey: ["grades"] });
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
      const newGrade = data.level;
      mutation.mutate({ newGrade, type });
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
        {type === "create" ? "Create a new grade" : "Update this grade"}
      </h1>
      <div className="flex flex-col w-full gap-1">
        <label
          className="capitalize text-[12px] text-gray-500"
          htmlFor={"grade"}
        >
          Grade
        </label>
        <input
          key="grade"
          className="text-[14px] p-2 h-[40px] border border-gray-400 outline-webSkyBold caret-webSkyBold transition-colors rounded-md"
          id="grade"
          defaultValue={data?.level}
          {...register("level")}
        />
        {errors.level?.message ? (
          <span className="text-[10px] text-red-600">
            {errors.level.message}
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

export default GradeForm;
