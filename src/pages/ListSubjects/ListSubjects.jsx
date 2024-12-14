import React, { useEffect, useState } from "react";
import SearchList from "../../components/SearchList/SearchList";
import {
  AddRounded,
  DeleteOutline,
  EditOutlined,
  SortRounded,
  TuneRounded,
} from "@mui/icons-material";
import Pagination from "../../components/Pagination/Pagination";
import Table from "../../components/Table/Table";
import { Link, useSearchParams } from "react-router-dom";
import { role, subjectsData } from "../../lib/data";
import FormModal from "../../components/FormModal/FormModal";
import { makeRequest } from "../../axios";
import { ITEMS_PER_PAGE } from "../../lib/settings";

const columns = [
  {
    header: "Subject Name",
    accessor: "studentsName",
  },
  // {
  //   header: 'Teachers',
  //   accessor: 'teachers',
  //   className: 'hidden md:table-cell'
  // },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const renderRows = (data) => {
  return data ? (
    data.map((item, index) => (
      <tr
        className="text-sm border-b-2 border-gray-100 even:bg-slate-100 hover:bg-webPurpleLight "
        key={item.id}
      >
        <td className="flex items-center p-4">
          <h2 className="text-[12px] font-semibold">{item.name}</h2>
        </td>
        {/* <td className="hidden md:table-cell">{item.teachers.join(", ")}</td> */}
        <td>
          <div className="flex gap-4">
            <FormModal table="subject" type="edit" />
            {role === "admin" ? (
              <FormModal table="subject" type="delete" />
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

const ListSubjects = () => {
  const [subjects, setSubjects] = useState();
  const [total, setTotal] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  let page = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;
  let pageItems = searchParams.get("pageItems")
    ? parseInt(searchParams.get("pageItems"))
    : ITEMS_PER_PAGE;
  useEffect(() => {
    const fetchData = async () => {
      const queryString = new URLSearchParams(searchParams);
      queryString.set("page", page);
      queryString.set("pageItems", pageItems);
      const res = await makeRequest.get(`/subjects?${queryString}`);
      setSubjects(res.data.subjects);
      setTotal(res.data.totalCount);
    };
    fetchData();
  }, [searchParams, page, pageItems]);

  console.log(total);
  return (
    <div className="flex flex-col gap-4 flex-1 p-4 m-2 rounded-xl bg-white">
      {/* TOP */}
      <div className="flex flex-col lg:flex-row justify-between">
        <h1 className="hidden lg:block text-[18px] font-semibold">
          All Subjects
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
            <FormModal table="subject" type="create" />
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRows={renderRows} data={subjects} />
      {/* PAGINATION */}
      <Pagination page={page} total={total} />
    </div>
  );
};

export default ListSubjects;
