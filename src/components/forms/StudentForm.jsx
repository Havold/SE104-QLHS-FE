import { CloudUploadOutlined, SubwayTwoTone } from "@mui/icons-material";
import InputField from "../InputField/InputField";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z
    .number()
    .min(10, { message: "Phone number must be at least 10 numbers long!" }),
  address: z.string().min(1, { message: "Address is required!" }).optional(),
  birthday: z.date(),
  sex: z.enum(["Male", "Female"], { message: "Sex is required!" }),
  img: z.instanceof(File, { message: "Image is required!" }),
});

export const StudentForm = ({ data, type = "create" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = handleSubmit((data) => console.log(data));
  const btnColor =
    type === "create"
      ? "bg-webYellow hover:bg-webYellowLight"
      : "bg-webSkyBold hover:bg-webSky";
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-[18px] font-semibold">
        {type === "create" ? "Create a new student" : "Update a student"}
      </h1>
      <div className="flex flex-col gap-4">
        <span className="text-[14px] text-gray-400">
          Authentication Information
        </span>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <InputField
            register={register}
            error={errors.username}
            label="Username"
            name="username"
          />
          <InputField
            register={register}
            error={errors.email}
            label="Email"
            name="email"
            type="email"
          />
          <InputField
            register={register}
            error={errors.password}
            label="Password"
            name="password"
            type="password"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-[14px] text-gray-400">Personal Information</span>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <InputField
            register={register}
            error={errors.lastName}
            label="Full Name"
            name="fullname"
          />
          <InputField
            register={register}
            error={errors.phone}
            label="Phone"
            name="phone"
          />
          <InputField
            register={register}
            error={errors.address}
            label="Address"
            name="address"
          />
          <InputField
            register={register}
            error={errors.birthday}
            label="Date of Birth"
            name="birthday"
            type="date"
          />
          <InputField
            register={register}
            error={errors.sex}
            label="Sex"
            name="sex"
            options={["Male", "Female"]}
            type="select"
          />
          <div className="flex flex-col w-full md:w-1/4">
            <input
              className="hidden"
              type="file"
              id="uploadProfilePic"
              {...register("img")}
            />
            <label
              htmlFor="uploadProfilePic"
              className="flex items-center gap-4 text-[12px] text-gray-500 cursor-pointer"
            >
              <CloudUploadOutlined />
              <span>Upload a photo</span>
            </label>
            {errors.img?.message && (
              <span className="text-[10px] text-red-600">
                {errors.img.message}
              </span>
            )}
          </div>
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
