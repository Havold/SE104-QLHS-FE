import React, { useEffect, useState } from "react";
import SearchList from "../../components/SearchList/SearchList";
import {
  SortRounded,
  TuneRounded,
  VisibilityOutlined,
} from "@mui/icons-material";
import Pagination from "../../components/Pagination/Pagination";
import Table from "../../components/Table/Table";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { role, studentsData } from "../../lib/data";
import FormModal from "../../components/FormModal/FormModal";
import { makeRequest } from "../../axios";
import { ITEMS_PER_PAGE } from "../../lib/settings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BusinessCenterRounded,
  HouseRounded,
  LocalLibraryRounded,
  SchoolRounded,
} from "@mui/icons-material";
import { z } from "zod";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  score: z.coerce
    .number()
    .min(0, { message: "Score must be at least 0!" })
    .max(10, { message: "Score must not exceed 10!" }),
});

const columns = [
  {
    header: "Info",
    accessor: "info",
    className: "text-center",
  },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden lg:table-cell text-center",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden md:table-cell text-center",
  },
  {
    header: "Score",
    accessor: "score",
    className: "table-cell text-center",
  },
  {
    header: "Actions",
    accessor: "actions",
    className: "text-center",
  },
];

const DetailScoreBoard = () => {
  const [errors, setErrors] = useState({});
  const [scores, setScores] = useState({});
  const handleScoreChange = (studentId, newScore) => {
    setScores((prevScores) => ({
      ...prevScores,
      [studentId]: newScore,
    }));

    // Kiểm tra tính hợp lệ của điểm số
    try {
      schema.parse({ score: parseFloat(newScore) }); // parse lại để kiểm tra
      setErrors((prevErrors) => ({ ...prevErrors, [studentId]: null })); // Nếu hợp lệ, xóa lỗi
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [studentId]: error.errors[0].message, // Lưu thông báo lỗi
      }));
    }
  };

  const renderRows = (data) => {
    return data ? (
      data.map((item) => (
        <tr
          className="text-sm border-b-2 border-gray-100 even:bg-slate-100 hover:bg-webPurpleLight "
          key={item.student.id}
        >
          <td className="flex items-center gap-4 p-4">
            <img
              className="md:hidden lg:block w-8 h-8 rounded-full object-cover"
              src={
                item.student.img
                  ? `${process.env.REACT_APP_API_URL}${item.student.img}`
                  : "/assets/noAvatar.jpg"
              }
              alt="profilePic"
            />
            <div className="flex flex-col">
              <h2 className="text-[12px] font-semibold">{`${item.student.fullName}`}</h2>
              {/* <span className="text-[8px] text-gray-500">
                {item.studentClasses[0]?.classSchoolYear.class.name}
              </span> */}
            </div>
          </td>
          <td className="hidden lg:table-cell text-center">
            {item.student.id}
          </td>

          <td className="hidden md:table-cell text-center">
            {item.student.phone}
          </td>
          <td className="table-cell">
            <div className="flex flex-col items-center">
              <input
                className="w-8 h-8 text-center text-[12px] rounded-md border-2 outline-webSkyBold border-gray-500"
                defaultValue={item.score || 0}
                type="text"
                onChange={(e) =>
                  handleScoreChange(item.student.id, e.target.value)
                }
              />
              {errors[item.student.id] && (
                <span className="text-[10px] text-red-600">
                  {errors[item.student.id]}
                </span>
              )}
            </div>
          </td>
          <td>
            <div className="flex gap-4 items-center justify-center">
              <Link to={`/list/students/${item.id}`}>
                <button className="flex w-8 h-8 rounded-full bg-webSky items-center justify-center">
                  <VisibilityOutlined
                    style={{ fontSize: 16, color: "whitesmoke" }}
                  />
                </button>
              </Link>
              {role === "admin" ? (
                <FormModal
                  type="remove"
                  table={`detail-score-boards/${scoreBoardId}/students`}
                  id={item.student.id}
                />
              ) : (
                <></>
              )}
            </div>
          </td>
        </tr>
      ))
    ) : (
      <></>
    );
  };

  const [searchParams, setSearchParams] = useSearchParams();
  let page = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;
  let pageItems = searchParams.get("pageItems")
    ? parseInt(searchParams.get("pageItems"))
    : ITEMS_PER_PAGE;
  const scoreBoardId = useLocation().pathname.split("/")[3];

  const { isPending, error, data } = useQuery({
    queryKey: ["score-board"],
    queryFn: () => {
      return makeRequest.get(`/score-boards/${scoreBoardId}`).then((res) => {
        return res.data;
      });
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedScores) => {
      return makeRequest
        .put(`/score-boards/${scoreBoardId}/scores`, {
          updatedScores,
        })
        .then((res) => res.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["score-board"] });
      toast(data, { type: "success" });
    },
    onError: (error) => {
      if (error) {
        toast(error.response.data, { type: "error" });
      }
    },
  });
  const saveScores = async () => {
    const updatedScores = Object.entries(scores).map(([studentId, score]) => ({
      studentId,
      score: parseFloat(score), // Đảm bảo dữ liệu là số
    }));

    mutation.mutate(updatedScores);
  };

  return (
    <div className="flex flex-col gap-4 flex-1 p-4 m-2 rounded-xl bg-white">
      {/* TOP */}
      <div className="flex flex-col gap-2 md:flex-row">
        {/* USER CARD */}
        <div className="flex flex-1 p-4 gap-4 items-center bg-webSky rounded-xl custom-box-shadow">
          <div className="w-full flex items-center justify-between gap-2">
            <div className="flex gap-2">
              <h2 className="text-[24px] font-semibold">Subject:</h2>
            </div>
            <span className="flex text-[100px] text-webSkyBold font-semibold">
              {error
                ? "Something went wrong with class data!"
                : isPending
                ? "Loading..."
                : data.subject.name}
              <FormModal type="edit" table="scoreBoard" data={data} />
            </span>
          </div>
        </div>
        {/* ITEM CARD */}
        <div className="flex-1 flex justify-center gap-2 flex-wrap">
          <div className="w-full sm:w-[48%] md:w-full lg:w-[48%] flex items-center gap-3 p-4 rounded-xl bg-white custom-box-shadow">
            <BusinessCenterRounded style={{ fontSize: 28, color: "#CFCEFF" }} />
            <div className="flex flex-col">
              <h3 className="text-[20px] font-medium">
                {error
                  ? "Something went wrong with class data!"
                  : isPending
                  ? "Loading..."
                  : data.schoolYear.value}
              </h3>
              <span className="text-[14px] text-gray-400">School Year</span>
            </div>
          </div>
          <div className="w-full sm:w-[48%] md:w-full lg:w-[48%] flex items-center gap-3 p-4 rounded-xl bg-white custom-box-shadow">
            <SchoolRounded style={{ fontSize: 28, color: "#CFCEFF" }} />
            <div className="flex flex-col">
              <h3 className="text-[20px] font-medium">
                {error
                  ? "Something went wrong with class data!"
                  : isPending
                  ? "Loading..."
                  : data.semester.name}
              </h3>
              <span className="text-[14px] text-gray-400">Semester</span>
            </div>
          </div>
          <div className="w-full sm:w-[48%] md:w-full lg:w-[48%] flex items-center gap-3 p-4 rounded-xl bg-white custom-box-shadow">
            <LocalLibraryRounded style={{ fontSize: 28, color: "#CFCEFF" }} />
            <div className="flex flex-col">
              <h3 className="text-[20px] font-medium">
                {error
                  ? "Something went wrong with class data!"
                  : isPending
                  ? "Loading..."
                  : data?.capacity}
              </h3>
              <span className="text-[14px] text-gray-400">Total</span>
            </div>
          </div>
          <div className="w-full sm:w-[48%] md:w-full lg:w-[48%] flex items-center gap-3 p-4 rounded-xl bg-white custom-box-shadow">
            <HouseRounded style={{ fontSize: 28, color: "#CFCEFF" }} />
            <div className="flex flex-col">
              <h3 className="text-[20px] font-medium">
                {error
                  ? "Something went wrong with class data!"
                  : isPending
                  ? "Loading..."
                  : data.typeOfExam.name}
              </h3>
              <span className="text-[14px] text-gray-400">Type of Exam</span>
            </div>
          </div>
        </div>
      </div>
      {/* TOP */}
      <div className="flex flex-col lg:flex-row justify-between">
        <h1 className="hidden lg:block text-[18px] font-semibold">
          All Students
        </h1>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* <SearchList /> */}
          <div className="flex gap-4 items-center">
            <button className="flex items-center justify-center w-4 h-4 p-4 rounded-full bg-webYellow">
              <TuneRounded style={{ fontSize: 16 }} />
            </button>
            <button className="flex items-center justify-center w-4 h-4 p-4 rounded-full bg-webYellow">
              <SortRounded fontSize="small" />
            </button>
            <FormModal type="create" table="detailScoreBoard" />
          </div>
        </div>
      </div>
      {/* LIST */}
      {error ? (
        "Something went wrong!"
      ) : isPending ? (
        "Loading..."
      ) : (
        <Table
          columns={columns}
          renderRows={renderRows}
          data={data.dtScoreBoards}
        />
      )}
      {/* PAGINATION */}
      {error ? (
        "Something went wrong!"
      ) : isPending ? (
        <></>
      ) : (
        <Pagination
          tableType="students-class"
          page={data.currentPage}
          total={data.totalCount}
        />
      )}
      <div className="flex items-center justify-end">
        <button
          onClick={saveScores}
          className="w-full md:w-[100px] text-[20px] p-1 bg-webSkyBold text-white rounded-md hover:bg-webSky transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default DetailScoreBoard;
