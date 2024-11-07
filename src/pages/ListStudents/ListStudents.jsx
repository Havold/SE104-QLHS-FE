import React, { useEffect, useState } from "react";
import SearchList from "../../components/SearchList/SearchList";
import {
  SortRounded,
  TuneRounded,
  VisibilityOutlined,
} from "@mui/icons-material";
import Pagination from "../../components/Pagination/Pagination";
import Table from "../../components/Table/Table";
import { Link, useSearchParams } from "react-router-dom";
import { role } from "../../lib/data";
import FormModal from "../../components/FormModal/FormModal";
import { makeRequest } from "../../axios";
import { ITEMS_PER_PAGE } from "../../lib/settings";

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
    header: "Grade",
    accessor: "subjects",
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
            src={item.img ? item.img : "/assets/noAvatar.jpg"}
            alt="profilePic"
          />
          <div className="flex flex-col">
            <h2 className="text-[12px] font-semibold">{`${item.firstName} ${item.lastName}`}</h2>
            <span className="text-[8px] text-gray-500">{item.class.name}</span>
          </div>
        </td>
        <td className="hidden lg:table-cell">{item.id}</td>
        <td className="hidden lg:table-cell">{item.grade.level}</td>
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
              <FormModal type="delete" table="student" />
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
  const [students, setStudents] = useState();
  const [total, setTotal] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  let page = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;
  let pageItems = searchParams.get("pageItems")
    ? parseInt(searchParams.get("pageItems"))
    : ITEMS_PER_PAGE;
  useEffect(() => {
    const fetchData = async () => {
      const res = await makeRequest.get(
        `/students?page=${page}&pageItems=${pageItems}`
      );
      setStudents(res.data.students);
      setTotal(res.data.totalCount);
    };

    fetchData();
  }, [page, pageItems]);

  return (
    <div className="flex flex-col gap-4 flex-1 p-4 m-2 rounded-xl bg-white">
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
      <Table columns={columns} renderRows={renderRows} data={students} />
      {/* PAGINATION */}
      <Pagination page={page} total={total} />
    </div>
  );
};

export default ListStudents;
