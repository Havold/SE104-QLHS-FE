import React, { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../../context/authContext";

const schema = z.object({
  score: z.coerce
    .number()
    .min(0, { message: "Score must be at least 0!" })
    .max(10, { message: "Score must not exceed 10!" }),
});

const columns = [
  {
    header: "Class",
    accessor: "class",
    className: "text-center",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden lg:table-cell text-center",
  },
  {
    header: "Passed",
    accessor: "phone",
    className: "hidden md:table-cell text-center",
  },
  {
    header: "Rate",
    accessor: "score",
    className: "table-cell text-center",
  },
];

const DetailSubjectReport = () => {
  const { hasAccessToken, currentUser } = useContext(AuthContext);
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
          key={item.classSchoolYearId}
        >
          <td className="table-cell text-center p-4 font-semibold">
            {item.classSchoolYear.class.name}
          </td>
          <td className="hidden md:table-cell text-center">{item.capacity}</td>
          <td className="hidden md:table-cell text-center">
            {item.numberPassed}
          </td>
          <td
            className={`table-cell text-center font-semibold ${
              item.percentage >= 50 ? " text-webGreen " : " text-webRed"
            }`}
          >
            {item.percentage + "%"}
          </td>
        </tr>
      ))
    ) : (
      <></>
    );
  };
  const location = useLocation();
  const { subjectName, schoolYear, semester } = location.state || {};
  const reportSubjectId = location.pathname.split("/")[3];

  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  let page = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;
  let pageItems = searchParams.get("pageItems")
    ? parseInt(searchParams.get("pageItems"))
    : ITEMS_PER_PAGE;

  const { isPending, error, data } = useQuery({
    queryKey: ["detail-subject-report"],
    queryFn: () => {
      return makeRequest
        .get(`/detail-subject-report/${reportSubjectId}`)
        .then((res) => {
          return res.data;
        });
    },
  });

  console.log(data);

  return (
    <div className="flex flex-col gap-4 flex-1 p-4 m-2 rounded-xl bg-white">
      {/* TOP */}
      <div className="flex flex-col gap-2 md:flex-row">
        {/* ITEM CARD */}
        <div className="w-full sm:w-[48%] md:w-full flex justify-between items-center gap-3 p-4 rounded-xl bg-white custom-box-shadow">
          <span className="text-[14px] text-gray-400">Subject</span>
          <h3 className="text-[20px] font-medium">
            {error
              ? "Something went wrong with class data!"
              : isPending
              ? "Loading..."
              : data?.capacity}
            {subjectName}
          </h3>
        </div>
        <div className="w-full sm:w-[48%] md:w-full flex items-center gap-3 p-4 rounded-xl bg-white custom-box-shadow">
          <BusinessCenterRounded style={{ fontSize: 28, color: "#CFCEFF" }} />
          <div className="flex flex-col">
            <h3 className="text-[20px] font-medium">{schoolYear}</h3>
            <span className="text-[14px] text-gray-400">School Year</span>
          </div>
        </div>
        <div className="w-full sm:w-[48%] md:w-full flex items-center gap-3 p-4 rounded-xl bg-white custom-box-shadow">
          <SchoolRounded style={{ fontSize: 28, color: "#CFCEFF" }} />
          <div className="flex flex-col">
            <h3 className="text-[20px] font-medium">{semester}</h3>
            <span className="text-[14px] text-gray-400">Semester</span>
          </div>
        </div>
      </div>
      {/* TOP */}
      <div className="flex flex-col lg:flex-row justify-between">
        <h1 className="hidden lg:block text-[18px] font-semibold">
          All Classes
        </h1>
      </div>
      {/* LIST */}
      {error ? (
        "Something went wrong!"
      ) : isPending ? (
        "Loading..."
      ) : (
        <Table columns={columns} renderRows={renderRows} data={data} />
      )}
    </div>
  );
};

export default DetailSubjectReport;
