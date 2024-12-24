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
import { role } from "../../lib/data";
import FormModal from "../../components/FormModal/FormModal";
import { makeRequest } from "../../axios";
import { ITEMS_PER_PAGE } from "../../lib/settings";
import { useQuery } from "@tanstack/react-query";
import {
  BoyRounded,
  BusinessCenterRounded,
  CakeRounded,
  EmailRounded,
  HouseRounded,
  LocalLibraryRounded,
  LocalPhoneRounded,
  LockClockRounded,
  SchoolRounded,
} from "@mui/icons-material";

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
              {item.studentClasses[0]?.classSchoolYear.class.name}
            </span>
          </div>
        </td>
        <td className="hidden lg:table-cell">{item.id}</td>

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

const ListStudentsClass = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [schoolYearId, setSchoolYearId] = useState();
  const [classId, setClassId] = useState();
  let page = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;
  let pageItems = searchParams.get("pageItems")
    ? parseInt(searchParams.get("pageItems"))
    : ITEMS_PER_PAGE;
  const classSchoolYearId = useLocation().pathname.split("/")[3];

  const {
    isPending: classIsPending,
    error: classError,
    data: classData,
  } = useQuery({
    queryKey: ["detail-classes", "class"],
    queryFn: () => {
      return makeRequest
        .get(`/detail-classes/${classSchoolYearId}`)
        .then((res) => {
          return res.data;
        });
    },
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["detail-classes"],
    queryFn: () => {
      const queryString = new URLSearchParams(searchParams);
      queryString.set("page", page);
      queryString.set("pageItems", pageItems);
      return makeRequest.get(`/students?${queryString}`).then((res) => {
        return res.data;
      });
    },
  });

  return (
    <div className="flex flex-col gap-4 flex-1 p-4 m-2 rounded-xl bg-white">
      {/* TOP */}
      <div className="flex flex-col gap-2 md:flex-row">
        {/* USER CARD */}
        <div className="flex flex-1 p-4 gap-4 items-center bg-webSky rounded-xl custom-box-shadow">
          <div className="w-full flex items-center justify-between gap-2">
            <div className="flex gap-2">
              <h2 className="text-[24px] font-semibold">Class:</h2>
            </div>
            <span className="flex text-[100px] text-webSkyBold font-semibold">
              {classError
                ? "Something went wrong with class data!"
                : classIsPending
                ? "Loading..."
                : classData.name}
              <FormModal type="edit" table="detailClass" data={classData} />
            </span>
          </div>
        </div>
        {/* ITEM CARD */}
        <div className="flex-1 flex justify-center gap-2 flex-wrap">
          <div className="w-full sm:w-[48%] md:w-full lg:w-[48%] flex items-center gap-3 p-4 rounded-xl bg-white custom-box-shadow">
            <BusinessCenterRounded style={{ fontSize: 28, color: "#CFCEFF" }} />
            <div className="flex flex-col">
              <h3 className="text-[20px] font-medium">
                {classError
                  ? "Something went wrong with class data!"
                  : classIsPending
                  ? "Loading..."
                  : classData.schoolYearValue}
              </h3>
              <span className="text-[14px] text-gray-400">School Year</span>
            </div>
          </div>
          <div className="w-full sm:w-[48%] md:w-full lg:w-[48%] flex items-center gap-3 p-4 rounded-xl bg-white custom-box-shadow">
            <SchoolRounded style={{ fontSize: 28, color: "#CFCEFF" }} />
            <div className="flex flex-col">
              <h3 className="text-[20px] font-medium">
                {classError
                  ? "Something went wrong with class data!"
                  : classIsPending
                  ? "Loading..."
                  : classData.gradeLevel}
              </h3>
              <span className="text-[14px] text-gray-400">Grade</span>
            </div>
          </div>
          <div className="w-full sm:w-[48%] md:w-full lg:w-[48%] flex items-center gap-3 p-4 rounded-xl bg-white custom-box-shadow">
            <LocalLibraryRounded style={{ fontSize: 28, color: "#CFCEFF" }} />
            <div className="flex flex-col">
              <h3 className="text-[20px] font-medium">
                {classError
                  ? "Something went wrong with class data!"
                  : classIsPending
                  ? "Loading..."
                  : classData.capacity}
              </h3>
              <span className="text-[14px] text-gray-400">Capacity</span>
            </div>
          </div>
          <div className="w-full sm:w-[48%] md:w-full lg:w-[48%] flex items-center gap-3 p-4 rounded-xl bg-white custom-box-shadow">
            <HouseRounded style={{ fontSize: 28, color: "#CFCEFF" }} />
            <div className="flex flex-col">
              <h3 className="text-[20px] font-medium">????</h3>
              <span className="text-[14px] text-gray-400">Class</span>
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
          <SearchList />
          <div className="flex gap-4 items-center">
            <button className="flex items-center justify-center w-4 h-4 p-4 rounded-full bg-webYellow">
              <TuneRounded style={{ fontSize: 16 }} />
            </button>
            <button className="flex items-center justify-center w-4 h-4 p-4 rounded-full bg-webYellow">
              <SortRounded fontSize="small" />
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

export default ListStudentsClass;
