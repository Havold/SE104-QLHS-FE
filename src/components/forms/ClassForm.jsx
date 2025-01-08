import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField/InputField";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import SelectDropDown from "../SelectDropDown/SelectDropDown";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../lib/settings";

const getSchema = (type) =>
  z.object({
    name:
      type === "filter"
        ? z.string().optional()
        : z.string().min(1, { message: "Name is required!" }),
  });

const ClassForm = ({ data, type = "create", setOpenForm }) => {
  const schema = getSchema(type);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  let pageItems = searchParams.get("pageItems")
    ? parseInt(searchParams.get("pageItems"))
    : ITEMS_PER_PAGE;
  const [grades, setGrades] = useState();
  const [selectedGrade, setSelectedGrade] = useState(data?.grade?.id || 1);
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
      else if (type === "filter") {
        searchParams.set("search", newClass.name);
        searchParams.set("grade", newClass.grade);
        const queryString = new URLSearchParams(searchParams);
        queryString.set("page", 1);
        queryString.set("pageItems", pageItems);
        navigate(`${location.pathname}?${queryString}`, { replace: true });
      } else
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
      const res = await makeRequest.get("/grades?type=all");
      setGrades(res?.data?.grades);
    };
    fetchGrades();
  }, []);

  return (
    <form
      className="h-full flex flex-col justify-center gap-4"
      onSubmit={onSubmit}
    >
      <h1 className="text-[18px] font-semibold ">
        {type === "create"
          ? "Create a new class"
          : type === "filter"
          ? "Filter class"
          : "Update a class"}
      </h1>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <InputField
          register={register}
          error={errors.name}
          label="Class name"
          name="name"
          defaultValue={
            type === "filter"
              ? searchParams.get("search")
              : data?.name.slice(2, data.name.length)
          }
        />
        <div className="flex flex-col w-full md:w-1/4 gap-1">
          <label
            className="capitalize text-[12px] text-gray-500"
            htmlFor={"grade"}
          >
            Grade
          </label>
          <SelectDropDown
            options={grades}
            selectedOption={selectedGrade}
            onChange={setSelectedGrade}
            displayKey="level"
          />
        </div>
      </div>
      <button
        className={`text-[18px] w-full p-2 rounded-md ${btnColor} transition-colors text-white`}
      >
        {type === "create" ? "Create" : type === "filter" ? "Filter" : "Update"}
      </button>
    </form>
  );
};

export default ClassForm;
