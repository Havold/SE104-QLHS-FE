import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField/InputField";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required!" }),
  grade: z.string(),
});

const ClassForm = ({ data, type = "create", setOpenForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const [grades, setGrades] = useState();
  const btnColor =
    type === "create"
      ? "bg-webYellow hover:bg-webYellowLight"
      : "bg-webSkyBold hover:bg-webSky";
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => {
      console.log(data);
      return makeRequest.post("/classes", data).then((res) => res.data);
    },
    onSuccess: (data) => {
      setOpenForm(false);
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      toast(data, { type: "success" });
    },
    onError: (error) => {
      toast(error.response.data, {
        type: "error",
      });
    },
  });
  const onValid = (data) => {
    mutation.mutate(data);
  };
  const onSubmit = handleSubmit(onValid);

  useEffect(() => {
    const fetchGrades = async () => {
      const res = await makeRequest.get("/grades");
      setGrades(res.data.grades);
    };
    fetchGrades();
  }, []);

  return (
    <form
      className="h-full flex flex-col justify-center gap-4"
      onSubmit={onSubmit}
    >
      <h1 className="text-[18px] font-semibold ">
        {type === "create" ? "Create a new class" : "Update this class"}
      </h1>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <InputField
          register={register}
          error={errors.name}
          label="Class name"
          name="name"
        />
        <div className="flex flex-col w-full md:w-1/4 gap-1">
          <label
            className="capitalize text-[12px] text-gray-500"
            htmlFor={"grade"}
          >
            Grade
          </label>
          <select
            className="text-[12px] p-2 h-[40px] border border-gray-400 outline-webSkyBold caret-webSkyBold transition-colors rounded-md"
            id="grade"
            {...register("grade")}
          >
            {grades
              ? grades.map((grade, index) => (
                  <option key={index} value={grade.id}>
                    {grade.level}
                  </option>
                ))
              : null}
          </select>
        </div>
      </div>
      <button
        className={`text-[18px] w-full p-2 rounded-md ${btnColor} transition-colors text-white`}
      >
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ClassForm;
