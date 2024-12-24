import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField/InputField";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const schema = z.object({});

const DetailClassForm = ({ data, type = "create", setOpenForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  console.log(data);

  const [schoolYears, setSchoolYears] = useState();
  const [classes, setClasses] = useState();
  const [selectedSchoolYear, setSelectedSchoolYear] = useState(
    data?.schoolYearId || 1
  );
  const [selectedClass, setSelectedClass] = useState(data?.classId || 1);
  const btnColor =
    type === "create"
      ? "bg-webYellow hover:bg-webYellowLight"
      : "bg-webSkyBold hover:bg-webSky";
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ newClass, type }) => {
      if (type === "create")
        return makeRequest
          .post("/detail-classes", newClass)
          .then((res) => res.data);
      else
        return makeRequest
          .put(`/detail-classes/${data.id}`, newClass)
          .then((res) => res.data);
    },
    onSuccess: (data) => {
      setOpenForm(false);
      queryClient.invalidateQueries({
        queryKey: ["detail-classes"],
      });
      toast(data, { type: "success" });
    },
    onError: (error) => {
      toast(error.response.data, {
        type: "error",
      });
    },
  });
  const onValid = async (data) => {
    console.log(selectedClass, selectedSchoolYear);
    const newClass = {
      ...data,
      classId: selectedClass,
      schoolYearId: selectedSchoolYear,
    };
    mutation.mutate({ newClass, type });
  };

  const handleChangeSchoolYearSelection = (e) => {
    setSelectedSchoolYear(e.target.value);
  };

  const handleChangeClassNameSelection = (e) => {
    setSelectedClass(e.target.value);
  };

  const onSubmit = handleSubmit(onValid);

  useEffect(() => {
    const fetchSchoolYears = async () => {
      const res = await makeRequest.get("/school-years");
      setSchoolYears(res?.data?.schoolYears);
    };
    const fetchClasses = async () => {
      const res = await makeRequest.get("/classes");
      setClasses(res?.data?.classes);
    };
    fetchSchoolYears();
    fetchClasses();
  }, []);

  return (
    <form
      className="h-full flex flex-col justify-center gap-4"
      onSubmit={onSubmit}
    >
      <h1 className="text-[18px] font-semibold text-black ">
        {type === "create"
          ? "Add a new class to a school year"
          : "Update this class"}
      </h1>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col w-full md:w-1/4 gap-1">
          <label
            className="capitalize text-[12px] text-gray-500"
            htmlFor={"className"}
          >
            Class Name
          </label>
          <select
            className="text-[12px] text-black p-2 h-[40px] border border-gray-400 outline-webSkyBold caret-webSkyBold transition-colors rounded-md"
            id="className"
            onChange={handleChangeClassNameSelection}
            value={selectedClass}
          >
            {!classes ? (
              <option value="">Loading...</option>
            ) : (
              classes.map((cs, index) => (
                <option key={index} value={cs.id}>
                  {cs.name}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="flex flex-col w-full md:w-1/4 gap-1">
          <label
            className="capitalize text-[12px] text-gray-500"
            htmlFor={"schoolYear"}
          >
            School Year
          </label>
          <select
            className="text-[12px] text-black p-2 h-[40px] border border-gray-400 outline-webSkyBold caret-webSkyBold transition-colors rounded-md"
            id="schoolYear"
            onChange={handleChangeSchoolYearSelection}
            value={selectedSchoolYear}
            // {...register("grade")}
          >
            {!schoolYears ? (
              <option value="">Loading...</option>
            ) : (
              schoolYears.map((schoolYear, index) => (
                <option key={index} value={schoolYear.id}>
                  {schoolYear.value}
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

export default DetailClassForm;
