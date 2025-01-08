import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField/InputField";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import SelectDropDown from "../SelectDropDown/SelectDropDown";

const schema = z.object({});

const SemesterReportForm = ({ data, type = "create", setOpenForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  console.log(data);

  const [schoolYears, setSchoolYears] = useState();
  const [semesters, setSemesters] = useState();
  const [selectedSchoolYear, setSelectedSchoolYear] = useState(
    data?.schoolYearId || 1
  );
  const [selectedSubject, setSelectedSubject] = useState(data?.subjectId || 1);
  const [selectedSemester, setSelectedSemester] = useState(
    data?.semesterId || 1
  );

  console.log(selectedSchoolYear);

  const btnColor =
    type === "create"
      ? "bg-webYellow hover:bg-webYellowLight"
      : "bg-webSkyBold hover:bg-webSky";
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ newSemesterReport, type }) => {
      if (type === "create")
        return makeRequest
          .post("/semester-reports", newSemesterReport)
          .then((res) => res.data);
      else
        return makeRequest
          .put(`/semester-reports/${data.id}`, newSemesterReport)
          .then((res) => res.data);
    },
    onSuccess: (data) => {
      setOpenForm(false);
      queryClient.invalidateQueries({
        queryKey: ["semester-reports"],
      });
      //   queryClient.invalidateQueries({
      //     queryKey: ["subject-report"],
      //   });
      toast(data, { type: "success" });
    },
    onError: (error) => {
      toast(error.response.data, {
        type: "error",
      });
    },
  });
  const onValid = async (data) => {
    const newSemesterReport = {
      ...data,
      schoolYearId: selectedSchoolYear,
      semesterId: selectedSemester,
    };

    console.log(newSemesterReport);
    mutation.mutate({ newSemesterReport, type });
  };

  const onSubmit = handleSubmit(onValid);

  useEffect(() => {
    const fetchSchoolYears = async () => {
      const res = await makeRequest.get("/school-years?type=all");
      setSchoolYears(res?.data?.schoolYears);
    };
    const fetchSemesters = async () => {
      const res = await makeRequest.get("/semesters?type=all");
      setSemesters(res?.data?.semesters);
    };

    fetchSchoolYears();
    fetchSemesters();
  }, []);

  return (
    <form
      className="h-full flex flex-col justify-center gap-4"
      onSubmit={onSubmit}
    >
      <h1 className="text-[18px] font-semibold text-black ">
        {type === "create"
          ? "Create a new semester report"
          : "Update this report"}
      </h1>

      <div className="flex flex-col md:flex-row justify-between gap-4">
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
        <div className="flex flex-col w-full md:w-1/4 gap-1">
          <label
            className="capitalize text-[12px] text-gray-500"
            htmlFor={"schoolYear"}
          >
            Semester
          </label>
          <SelectDropDown
            options={semesters}
            selectedOption={selectedSemester}
            onChange={setSelectedSemester}
            displayKey="name"
          />
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

export default SemesterReportForm;
