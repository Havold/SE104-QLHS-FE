import React from "react";
import SearchList from "../../components/SearchList/SearchList";
import {
  ReplayRounded,
  SortRounded,
  TuneRounded,
  VisibilityOutlined,
} from "@mui/icons-material";
import Pagination from "../../components/Pagination/Pagination";
import Table from "../../components/Table/Table";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { role } from "../../lib/data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ITEMS_PER_PAGE } from "../../lib/settings";
import { makeRequest } from "../../axios";
import FormModal from "../../components/FormModal/FormModal";

const columns = [
  {
    header: "School Year",
    accessor: "schoolYear",
    className: "table-cell",
  },
  {
    header: "Semester",
    accessor: "student",
    className: "hidden md:table-cell",
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
        <td className="table-cell p-4">{item.schoolYear.value}</td>
        <td className="hidden md:table-cell">{item.semester.name}</td>
        <td>
          <div className="flex gap-4">
            <Link
              to={`/list/semester-reports/${item.id}`}
              state={{
                schoolYear: item.schoolYear.value,
                semester: item.semester.name,
              }}
            >
              <button className="flex w-8 h-8 rounded-full bg-webSky items-center justify-center">
                <VisibilityOutlined
                  style={{ fontSize: 16, color: "whitesmoke" }}
                />
              </button>
            </Link>
            {role === "admin" ? (
              <FormModal table="semester-report" type="delete" id={item.id} />
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

const ListSemesterReports = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page"))
    : 1;
  const pageItems = searchParams.get("pageItems")
    ? parseInt(searchParams.get("pageItems"))
    : ITEMS_PER_PAGE;

  const { isPending, error, data } = useQuery({
    queryKey: ["semester-reports"],
    queryFn: () => {
      const queryString = new URLSearchParams(searchParams);
      queryString.set("page", page);
      queryString.set("pageItems", pageItems);
      return makeRequest.get(`/semester-reports?${queryString}`).then((res) => {
        return res.data;
      });
    },
  });

  const mutation = useMutation({
    mutationFn: () => {
      return navigate(location.pathname);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["semester-reports"] });
    },
  });

  console.log(data);

  return (
    <div className="flex flex-col gap-4 flex-1 p-4 m-2 rounded-xl bg-white">
      {/* TOP */}
      <div className="flex flex-col lg:flex-row justify-between">
        <h1 className="hidden lg:block text-[18px] font-semibold">
          All Semester Reports
        </h1>
        <div className="flex flex-col lg:flex-row gap-4">
          <SearchList />
          <div className="flex gap-4 items-center">
            <FormModal table="semesterReport" type="filter" />
            <button
              onClick={(e) => {
                mutation.mutate();
              }}
              className="flex items-center justify-center w-4 h-4 p-4 rounded-full bg-webYellow"
            >
              <ReplayRounded fontSize="small" />
            </button>
            <FormModal table="semesterReport" type="create" />
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
          data={data.semesterReports}
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

export default ListSemesterReports;
