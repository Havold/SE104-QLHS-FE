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
});

const ClassForm = ({ data, type = "create", setOpenForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  // const [selectedGrade, setSelectedGrade] = useState(data.grade.id ? data.grade.)

  const [grades, setGrades] = useState();
  const [selectedGrade, setSelectedGrade] = useState(data.grade.id);
  const btnColor =
    type === "create"
      ? "bg-webYellow hover:bg-webYellowLight"
      : "bg-webSkyBold hover:bg-webSky";
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ newClass, type }) => {
      console.log(newClass);
      if (type === "create")
        return makeRequest.post("/classes", newClass).then((res) => res.data);
      else
        return makeRequest
          .put(`/classes/${data.id}`, newClass)
          .then((res) => res.data);
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
  const onValid = async (data) => {
    console.log(data);
    const newClass = { ...data, grade: selectedGrade };
    mutation.mutate({ newClass, type });
  };

  const handleChangeSelection = (e) => {
    setSelectedGrade(e.target.value);
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
          defaultValue={data.name.slice(2, data.name.length)}
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
            onChange={handleChangeSelection}
            value={selectedGrade}
            // {...register("grade")}
          >
            {!grades ? (
              <option value="">Loading...</option>
            ) : (
              grades.map((grade, index) => (
                <option key={index} value={grade.id}>
                  {grade.level}
                </option>
              ))
            )}
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
