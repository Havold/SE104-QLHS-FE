import React, { useEffect, useState } from "react";
import SearchList from "../../components/SearchList/SearchList";
import { ReplayRounded, VisibilityOutlined } from "@mui/icons-material";
import Pagination from "../../components/Pagination/Pagination";
import Table from "../../components/Table/Table";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { role } from "../../lib/data";
import FormModal from "../../components/FormModal/FormModal";
import { makeRequest } from "../../axios";
import { ITEMS_PER_PAGE } from "../../lib/settings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    header: "Email",
    accessor: "email",
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
    header: "Actions",
    accessor: "actions",
  },
];

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
                : "/assets/noAvatar.jpg"
            }
            alt="profilePic"
          />
          <div className="flex flex-col">
            <h2 className="text-[12px] font-semibold">{`${item.fullName}`}</h2>
            <span className="text-[8px] text-gray-500">
              {item.studentClasses.map((studentClass, index) => (
                <span key={index}>
                  {studentClass?.classSchoolYear?.class?.name}
                  {index < item.studentClasses.length - 1 && ", "}{" "}
                  {/* Thêm dấu phẩy giữa các lớp, không thêm dấu cuối */}
                </span>
              ))}
              {/* Sẽ cần phải bổ sung các lớp qua từng năm họcg*/}
            </span>
          </div>
        </td>
        <td className="hidden lg:table-cell">{item.id}</td>
        {/* <td className="hidden lg:table-cell">
          {item.studentClasses[0]?.classSchoolYear?.class?.grade?.level}
        </td> */}
        <td className="hidden md:table-cell">{item.email}</td>
        <td className="hidden md:table-cell">{item.phone}</td>
        <td className="hidden lg:table-cell">{item.address}</td>
        <td>
          <div className="flex gap-4">
            <Link to={`/list/students/${item.id}`}>
              <button className="flex w-8 h-8 rounded-full bg-webSky items-center justify-center">
                <VisibilityOutlined
                  style={{ fontSize: 16, color: "whitesmoke" }}
                />
              </button>
            </Link>
            {role === "admin" ? (
              <FormModal type="delete" table="student" id={item.id} />
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

const ListStudents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  let page = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;
  let pageItems = searchParams.get("pageItems")
    ? parseInt(searchParams.get("pageItems"))
    : ITEMS_PER_PAGE;
  console.log(process.env.REACT_APP_API_URL);

  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["students"],
    queryFn: () => {
      const queryString = new URLSearchParams(searchParams);
      queryString.set("page", page);
      queryString.set("pageItems", pageItems);
      return makeRequest.get(`/students?${queryString}`).then((res) => {
        return res.data;
      });
    },
  });

  const mutation = useMutation({
    mutationFn: () => {
      return navigate(location.pathname);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  console.log(data);

  return (
    <div className="flex flex-col gap-4 flex-1 p-4 m-2 rounded-xl bg-white custom-page-animation">
      {/* TOP */}
      <div className="flex flex-col lg:flex-row justify-between">
        <h1 className="hidden lg:block text-[18px] font-semibold">
          All Students
        </h1>
        <div className="flex flex-col lg:flex-row gap-4">
          <SearchList table="students" />
          <div className="flex gap-4 items-center">
            <FormModal type="filter" table="student" />
            <button
              onClick={(e) => {
                mutation.mutate();
              }}
              className="flex items-center justify-center w-4 h-4 p-4 rounded-full bg-webYellow"
            >
              <ReplayRounded fontSize="small" />
            </button>
            <FormModal type="create" table="student" />
          </div>
        </div>
      </div>
      {/* LIST */}
      {error ? (
        "Something went wrong!"
      ) : isPending ? (
        "Loading..."
      ) : (
        <Table columns={columns} renderRows={renderRows} data={data.students} />
      )}
      {/* PAGINATION */}
      {error ? (
        "Something went wrong!"
      ) : isPending ? (
        <></>
      ) : (
        <Pagination page={data.currentPage} total={data.totalCount} />
      )}
    </div>
  );
};

export default ListStudents;
