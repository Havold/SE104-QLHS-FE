import React from "react";
import SearchList from "../../components/SearchList/SearchList";
import {
  AddRounded,
  DeleteOutline,
  EditOutlined,
  SortRounded,
  TuneRounded,
  VisibilityOutlined,
} from "@mui/icons-material";
import Pagination from "../../components/Pagination/Pagination";
import Table from "../../components/Table/Table";
import { Link, useSearchParams } from "react-router-dom";
import { role, resultsData } from "../../lib/data";
import { useQuery } from "@tanstack/react-query";
import { ITEMS_PER_PAGE } from "../../lib/settings";
import { makeRequest } from "../../axios";
import FormModal from "../../components/FormModal/FormModal";

const columns = [
  {
    header: "Subject",
    accessor: "subject",
  },
  {
    header: "School Year",
    accessor: "schoolYear",
    className: "hidden md:table-cell",
  },

  {
    header: "Semester",
    accessor: "student",
    className: "hidden md:table-cell",
  },
  // {
  //   header: "Date",
  //   accessor: "date",
  //   className: "hidden lg:table-cell",
  // },
  {
    header: "Type",
    accessor: "type",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const renderRows = (data) => {
  return data.map((item) => (
    <tr
      className="text-sm border-b-2 border-gray-100 even:bg-slate-100 hover:bg-webPurpleLight "
      key={item.id}
    >
      <td className="flex items-center p-4">
        <h2 className="text-[12px] font-semibold">{item.subject.name}</h2>
      </td>
      <td className="hidden md:table-cell">{item.schoolYear.value}</td>
      <td className="hidden md:table-cell">{item.semester.name}</td>
      <td className="hidden lg:table-cell">{item.typeOfExam.name}</td>
      {/* <td className="hidden lg:table-cell">{item.date}</td> */}
      <td>
        <div className="flex gap-4">
          <Link to={`/list/score-boards/${item.id}`}>
            <button className="flex w-8 h-8 rounded-full bg-webSky items-center justify-center">
              <VisibilityOutlined
                style={{ fontSize: 16, color: "whitesmoke" }}
              />
            </button>
          </Link>
          {role === "admin" ? (
            <FormModal table="score-board" type="delete" id={item.id} />
          ) : (
            <></>
          )}
        </div>
      </td>
    </tr>
  ));
};

const ListScoreBoards = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page"))
    : 1;
  const pageItems = searchParams.get("pageItems")
    ? parseInt(searchParams.get("pageItems"))
    : ITEMS_PER_PAGE;

  const { isPending, error, data } = useQuery({
    queryKey: ["score-boards"],
    queryFn: () => {
      const queryString = new URLSearchParams(searchParams);
      queryString.set("page", page);
      queryString.set("pageItems", pageItems);
      return makeRequest.get(`/score-boards?${queryString}`).then((res) => {
        return res.data;
      });
    },
  });

  console.log(data);

  return (
    <div className="flex flex-col gap-4 flex-1 p-4 m-2 rounded-xl bg-white">
      {/* TOP */}
      <div className="flex flex-col lg:flex-row justify-between">
        <h1 className="hidden lg:block text-[18px] font-semibold">
          All Results
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
            <FormModal table="scoreBoard" type="create" />
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
          data={data.scoreBoards}
        />
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

export default ListScoreBoards;
