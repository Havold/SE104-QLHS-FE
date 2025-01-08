import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField/InputField";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import SelectDropDown from "../SelectDropDown/SelectDropDown";

const schema = z.object({
  //   name: z.string().min(1, { message: "Name is required!" }),
  value: z.coerce
    .number()
    .min(0, { message: "Value must be a positive number!" }),
});

const RuleForm = ({ data, type = "create", setOpenForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const btnColor =
    type === "create"
      ? "bg-webYellow hover:bg-webYellowLight"
      : "bg-webSkyBold hover:bg-webSky";
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newRule) => {
      console.log(newRule);
      if (type === "create")
        return makeRequest.post("/rules", newRule).then((res) => res.data);
      else
        return makeRequest
          .put(`/rules/${data.id}`, newRule)
          .then((res) => res.data);
    },
    onSuccess: (data) => {
      setOpenForm(false);
      queryClient.invalidateQueries({ queryKey: ["rules"] });
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
    mutation.mutate(data);
  };

  const onSubmit = handleSubmit(onValid);

  return (
    <form
      className="h-full flex flex-col justify-center gap-4"
      onSubmit={onSubmit}
    >
      <h1 className="text-[18px] font-semibold ">Update this rule</h1>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <InputField
          register={register}
          error={errors.name}
          label="Rule name"
          name="name"
          disable={true}
          value={data?.name}
        />
        <InputField
          register={register}
          error={errors.value}
          label="Value"
          name="value"
          defaultValue={data?.value}
        />
      </div>
      <button
        className={`text-[18px] w-full p-2 rounded-md ${btnColor} transition-colors text-white`}
      >
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default RuleForm;
