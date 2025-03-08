import React, { useState } from "react";
import { makeRequest } from "../../axios";
import { ITEMS_PER_PAGE } from "../../lib/settings";
import { useLocation, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Pagination from "../Pagination/Pagination";
import Table from "../Table/Table";
import SearchList from "../SearchList/SearchList";
import { Check, SortRounded, TuneRounded } from "@mui/icons-material";
import { toast } from "react-toastify";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden lg:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden md:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Select",
    accessor: "select",
  },
];

const ListStudentForm = ({ data, type = "add", setOpenForm }) => {
  const renderRows = (data) => {
    return data ? (
      data.map((item) => (
        <tr
          className="text-sm border-b-2 border-gray-100 even:bg-slate-100 hover:bg-webPurpleLight "
          key={item.id}
        >
          <td className="flex items-center gap-4 p-4">
            <img
              className="md:hidden lg:block w-8 h-8 rounded-full object-cover"
              src={
                item.img
                  ? `${process.env.REACT_APP_API_URL}${item.img}`
                  : "../../assets/noAvatar.jpg"
              }
              alt="profilePic"
            />
            <div className="flex flex-col">
              <h2 className="text-[12px] font-semibold">{`${item.fullName}`}</h2>
              <span className="text-[8px] text-gray-500">
                {item?.studentClasses[0]?.classSchoolYear.class.name}
              </span>
            </div>
          </td>
          <td className="hidden lg:table-cell">{item.id}</td>
          <td className="hidden md:table-cell">{item.phone}</td>
          <td className="hidden lg:table-cell">{item.address}</td>
          <td>
            <div className="flex items-center justify-center">
              <input
                className="accent-webSkyBold "
                type="checkbox"
                checked={selectedStudents.includes(item.id)}
                onChange={(e) => handleCheckboxChange(e, item.id)}
              />
            </div>
          </td>
        </tr>
      ))
    ) : (
      <></>
    );
  };

  // Hàm xử lý thay đổi trạng thái checkbox
  const handleCheckboxChange = (e, studentId) => {
    if (e.target.checked) {
      setSelectedStudents((prev) => [...prev, studentId]); // Thêm ID vào danh sách
    } else {
      setSelectedStudents((prev) => prev.filter((id) => id !== studentId)); // Xóa ID khỏi danh sách
    }
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedStudents, setSelectedStudents] = useState([]);

  //   const [schoolYearId, setSchoolYearId] = useState();
  //   const [classId, setClassId] = useState();
  let subPage = searchParams.get("subPage") ? searchParams.get("subPage") : 1;
  let pageItems = searchParams.get("pageItems")
    ? parseInt(searchParams.get("pageItems"))
    : ITEMS_PER_PAGE;
  const classSchoolYearId = useLocation().pathname.split("/")[3];
  const {
    isPending,
    error,
    data: studentsData,
  } = useQuery({
    queryKey: ["detail-classes", "modal-table"],
    queryFn: () => {
      const queryString = new URLSearchParams(searchParams);
      queryString.set("subPage", subPage);
      queryString.set("pageItems", pageItems);
      queryString.set("type", "exclude");
      return makeRequest.get(`/students?${queryString}`).then((res) => {
        return res.data;
      });
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ classSchoolYearId, studentIds }) => {
      return makeRequest
        .post("/students-class", { studentIds, classSchoolYearId })
        .then((res) => res.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["detail-classes", "class"] });
      queryClient.invalidateQueries({ queryKey: ["students-class"] });
      toast(data, { type: "success" });
      setOpenForm(false); // Đóng form nếu cần
    },
    onError: (error) => {
      toast(error.response.data, { type: "error" });
    },
  });
  const handleSubmit = async () => {
    mutation.mutate({ classSchoolYearId, studentIds: selectedStudents });
  };
  console.log(studentsData);
  return (
    <div className="flex flex-col gap-4">
      {/* TITLE */}
      <div className="flex flex-col lg:flex-row justify-between gap-2">
        <h1 className="text-[18px] font-semibold">
          Add students to this class
        </h1>
        <div className="flex flex-col lg:flex-row gap-4">
          <SearchList table="detail-classes" type="modal-table" />
          <div className="flex gap-4 items-center">
            <button className="flex items-center justify-center w-4 h-4 p-4 rounded-full bg-webYellow">
              <TuneRounded style={{ fontSize: 16 }} />
            </button>
            <button className="flex items-center justify-center w-4 h-4 p-4 rounded-full bg-webYellow">
              <SortRounded fontSize="small" />
            </button>
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
          data={studentsData.students}
        />
      )}
      {/* PAGINATION */}
      {error ? (
        "Something went wrong!"
      ) : isPending ? (
        <></>
      ) : (
        <Pagination
          type="modal-table"
          page={studentsData.currentPage}
          total={studentsData.totalCount}
        />
      )}
      <button
        className="text-[18px] w-full p-2 rounded-md bg-webYellow hover:bg-webYellowLight cursor-pointer transition-colors text-white"
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );
};

export default ListStudentForm;
