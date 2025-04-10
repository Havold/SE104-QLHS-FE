import React from "react";
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
import { Link } from "react-router-dom";
import { role, examsData } from "../../lib/data";

const columns = [
  {
    header: 'Subject',
    accessor: 'subject',
  },
  {
    header: 'Class',
    accessor: 'class',
    className: 'hidden md:table-cell'
  },
  {
    header: 'Teacher',
    accessor: 'teacher',
    className: 'hidden lg:table-cell',
  },
  {
    header: 'Date',
    accessor: 'date',
    className: 'hidden lg:table-cell',
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const ListExams = () => {
  const renderRows = (data) => {
    return data.map((item) => (
      <tr
        className="text-sm border-b-2 border-gray-100 even:bg-slate-100 hover:bg-webPurpleLight "
        key={item.id}
      >
        <td className="flex items-center p-4">
            <h2 className="text-[12px] font-semibold">{item.subject}</h2>
        </td>
        <td className="hidden md:table-cell">{item.class}</td>
        <td className="hidden lg:table-cell">{item.teacher}</td>
        <td className="hidden lg:table-cell">{item.date}</td>
        <td>
          <div className="flex gap-4">
            <Link to={`/list/teachers/${item.teacherId}`}>
              <button className="flex w-8 h-8 rounded-full bg-webSky items-center justify-center">
                <EditOutlined
                  style={{ fontSize: 16, color: "whitesmoke" }}
                />
              </button>
            </Link>
            {role === "admin" ? (
              <button className="flex w-8 h-8 rounded-full bg-webPurple items-center justify-center">
                <DeleteOutline style={{ fontSize: 16, color: "whitesmoke" }} />
              </button>
            ) : (
              <></>
            )}
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="flex flex-col gap-4 flex-1 p-4 m-2 rounded-xl bg-white">
      {/* TOP */}
      <div className="flex flex-col lg:flex-row justify-between">
        <h1 className="hidden lg:block text-[18px] font-semibold">
          All Exams
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
            <button className="flex items-center justify-center w-4 h-4 p-4 rounded-full bg-webYellow">
              <AddRounded fontSize="small" />
            </button>
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRows={renderRows} data={examsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default ListExams;
