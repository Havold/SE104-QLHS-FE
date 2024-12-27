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

const ScoreBoardForm = ({ data, type = "create", setOpenForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  console.log(data);

  const [schoolYears, setSchoolYears] = useState();
  const [subjects, setSubjects] = useState();
  const [semesters, setSemesters] = useState();
  const [classes, setClasses] = useState();
  const [typesOfExam, setTypesOfExam] = useState();
  const [selectedSchoolYear, setSelectedSchoolYear] = useState(
    data?.schoolYearId || 1
  );

  const [selectedClass, setSelectedClass] = useState(data?.classId || 0);

  const [selectedSubject, setSelectedSubject] = useState(data?.subjectId || 1);
  const [selectedSemester, setSelectedSemester] = useState(
    data?.semesterId || 1
  );
  const [selectedTypeOfExam, setSelectedTypeOfExam] = useState(
    data?.typeOfExamId || 1
  );

  const btnColor =
    type === "create"
      ? "bg-webYellow hover:bg-webYellowLight"
      : "bg-webSkyBold hover:bg-webSky";
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ newScoreBoard, type }) => {
      if (type === "create")
        return makeRequest
          .post("/score-boards", newScoreBoard)
          .then((res) => res.data);
      else
        return makeRequest
          .put(`/score-boards/${data.id}`, newScoreBoard)
          .then((res) => res.data);
    },
    onSuccess: (data) => {
      setOpenForm(false);
      queryClient.invalidateQueries({
        queryKey: ["score-boards"],
      });
      queryClient.invalidateQueries({
        queryKey: ["score-board"],
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
    const newScoreBoard = {
      ...data,
      subjectId: selectedSubject,
      schoolYearId: selectedSchoolYear,
      semesterId: selectedSemester,
      typeOfExamId: selectedTypeOfExam,
      classId: selectedClass,
    };

    mutation.mutate({ newScoreBoard, type });
  };

  const onSubmit = handleSubmit(onValid);

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
    const fetchTypesOfExam = async () => {
      const res = await makeRequest.get("/types-of-exam?type=all");
      setTypesOfExam(res?.data?.typesOfExam);
    };
    fetchSchoolYears();
    fetchSubjects();
    fetchSemesters();
    fetchTypesOfExam();
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      const res = await makeRequest.get(
        `/classes?type=all&schoolYearId=${selectedSchoolYear}`
      );
      setClasses(res?.data?.classes);
    };
    fetchClasses();
  }, [selectedSchoolYear]);

  return (
    <form
      className="h-full flex flex-col justify-center gap-4"
      onSubmit={onSubmit}
    >
      <h1 className="text-[18px] font-semibold text-black ">
        {type === "create" ? "Create a new result" : "Update this class"}
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
            Class
          </label>
          <SelectDropDown
            options={classes}
            selectedOption={selectedClass}
            onChange={setSelectedClass}
            displayKey="name"
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
        <div className="flex flex-col w-full md:w-1/4 gap-1">
          <label
            className="capitalize text-[12px] text-gray-500"
            htmlFor={"schoolYear"}
          >
            Type Of Exam
          </label>
          <SelectDropDown
            options={typesOfExam}
            selectedOption={selectedTypeOfExam}
            onChange={setSelectedTypeOfExam}
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

export default ScoreBoardForm;
