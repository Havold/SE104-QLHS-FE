import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import SelectDropDown from "../SelectDropDown/SelectDropDown";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../lib/settings";

const schema = z.object({});

const SubjectReportForm = ({ data, type = "create", setOpenForm }) => {
  // Khai báo dùng zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Khai báo các hằng, biến
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [schoolYears, setSchoolYears] = useState();
  const [subjects, setSubjects] = useState();
  const [semesters, setSemesters] = useState();
  const [selectedSchoolYear, setSelectedSchoolYear] = useState(
    data?.schoolYearId || ""
  );
  const [selectedSubject, setSelectedSubject] = useState(data?.subjectId || "");
  const [selectedSemester, setSelectedSemester] = useState(
    data?.semesterId || ""
  );
  const queryClient = useQueryClient();
  let pageItems = searchParams.get("pageItems")
    ? parseInt(searchParams.get("pageItems"))
    : ITEMS_PER_PAGE;

  const btnColor =
    type === "create"
      ? "bg-webYellow hover:bg-webYellowLight"
      : "bg-webSkyBold hover:bg-webSky";

  // Dùng useMutation
  const mutation = useMutation({
    mutationFn: ({ newSubjectReport, type }) => {
      if (type === "create")
        return makeRequest
          .post("/subject-reports", newSubjectReport)
          .then((res) => res.data);
      else if (type === "filter") {
        if (selectedSubject) {
          searchParams.set("subjectId", newSubjectReport.subjectId);
        }
        if (selectedSchoolYear) {
          searchParams.set("schoolYearId", newSubjectReport.schoolYearId);
        }

        if (selectedSemester) {
          searchParams.set("semesterId", newSubjectReport.semesterId);
        }

        const queryString = new URLSearchParams(searchParams);
        queryString.set("page", 1);
        queryString.set("pageItems", pageItems);

        navigate(`${location.pathname}?${queryString}`, { replace: true });
      } else
        return makeRequest
          .put(`/subject-reports/${data.id}`, newSubjectReport)
          .then((res) => res.data);
    },
    onSuccess: (data) => {
      setOpenForm(false);
      queryClient.invalidateQueries({
        queryKey: ["subject-reports"],
      });
      toast(data, { type: "success" });
    },
    onError: (error) => {
      toast(error.response.data, {
        type: "error",
      });
    },
  });

  // Khi zod xác nhận các trường đã hợp lệ
  const onValid = async (data) => {
    const newSubjectReport = {
      ...data,
      subjectId: selectedSubject,
      schoolYearId: selectedSchoolYear,
      semesterId: selectedSemester,
    };

    console.log(newSubjectReport);
    mutation.mutate({ newSubjectReport, type });
  };

  const onSubmit = handleSubmit(onValid);

  // fetch data cho các selection fields.
  useEffect(() => {
    const fetchSchoolYears = async () => {
      const res = await makeRequest.get("/school-years?type=all");
      setSchoolYears(res?.data?.schoolYears);
    };
    const fetchSubjects = async () => {
      const res = await makeRequest.get("/subjects?type=all");
      setSubjects(res?.data?.subjects);
    };
    const fetchSemesters = async () => {
      const res = await makeRequest.get("/semesters?type=all");
      setSemesters(res?.data?.semesters);
    };

    fetchSchoolYears();
    fetchSubjects();
    fetchSemesters();
  }, []);

  console.log(data);

  return (
    <form
      className="h-full flex flex-col justify-center gap-4"
      onSubmit={onSubmit}
    >
      <h1 className="text-[18px] font-semibold text-black ">
        {type === "create"
          ? "Create a new subject report"
          : type === "filter"
          ? "Filter Subject Reports"
          : "Update this report"}
      </h1>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col w-full md:w-1/4 gap-1">
          <label
            className="capitalize text-[12px] text-gray-500"
            htmlFor={"className"}
          >
            Subject Name
          </label>
          <SelectDropDown
            options={subjects ? subjects : []}
            selectedOption={selectedSubject}
            onChange={setSelectedSubject}
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
        {type === "create" ? "Create" : type === "filter" ? "Filter" : "Update"}
      </button>
    </form>
  );
};

export default SubjectReportForm;
