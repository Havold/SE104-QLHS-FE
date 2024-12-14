import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Tạo schema
const schema = z.object({
  name: z.string().min(1, { message: "Name is required!" }),
});

const SubjectForm = ({ data, type = "create" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const btnColor =
    type === "create"
      ? "bg-webYellow hover:bg-webYellowLight"
      : "bg-webSkyBold hover:bg-webSky";
  const onSubmit = handleSubmit((data) => console.log(data));

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
