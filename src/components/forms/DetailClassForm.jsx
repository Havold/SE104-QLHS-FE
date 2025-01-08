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
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  let pageItems = searchParams.get("pageItems")
    ? parseInt(searchParams.get("pageItems"))
    : ITEMS_PER_PAGE;
  const [schoolYears, setSchoolYears] = useState();
  const [classes, setClasses] = useState();
  const [selectedSchoolYear, setSelectedSchoolYear] = useState(
    searchParams.get("schoolYearId")
      ? parseInt(searchParams.get("schoolYearId"))
      : data?.schoolYearId || ""
  );

  const [selectedClass, setSelectedClass] = useState(
    searchParams.get("classId")
      ? parseInt(searchParams.get("classId"))
      : data?.classId || ""
  );
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
      else if (type === "filter") {
        searchParams.set("classId", newClass.classId);
        searchParams.set("schoolYearId", newClass.schoolYearId);
        searchParams.set("search", "");
        const queryString = new URLSearchParams(searchParams);
        queryString.set("page", 1);
        queryString.set("pageItems", pageItems);
        navigate(`${location.pathname}?${queryString}`, { replace: true });
      } else
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
    const newClass = {
      ...data,
      classId: selectedClass,
      schoolYearId: selectedSchoolYear,
    };
    mutation.mutate({ newClass, type });
  };

  const onSubmit = handleSubmit(onValid);

  useEffect(() => {
    const fetchSchoolYears = async () => {
      const res = await makeRequest.get("/school-years?type=all");
      setSchoolYears(res?.data?.schoolYears);
    };
    const fetchClasses = async () => {
      const res = await makeRequest.get("/classes?type=all");
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
          ? "Add A New Class To A School Year"
          : type === "filter"
          ? "Filter Classes Through The School Years"
          : ""}
      </h1>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col w-full md:w-1/4 gap-1">
          <label
            className="capitalize text-[12px] text-gray-500"
            htmlFor={"className"}
          >
            Class Name
          </label>
          <SelectDropDown
            options={classes ? classes : []}
            selectedOption={selectedClass}
            onChange={setSelectedClass}
          />
        </div>
        <div className="flex flex-col w-full md:w-1/4 gap-1">
          <label
            className="capitalize text-[12px] text-gray-500"
            htmlFor={"schoolYear"}
          >
            School Year
          </label>

          <SelectDropDown
            options={schoolYears}
            selectedOption={selectedSchoolYear}
            onChange={setSelectedSchoolYear}
            displayKey="value"
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

export default DetailClassForm;
