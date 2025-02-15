import React, { useContext } from "react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ITEMS_PER_PAGE } from "../../lib/settings";
import { makeRequest } from "../../axios";
import FormModal from "../../components/FormModal/FormModal";
import { AuthContext } from "../../context/authContext";

const columns = [
  {
    header: "Subject",
    accessor: "subject",
  },
  {
    header: "School Year",
    accessor: "schoolYear",
    className: "hidden lg:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden lg:table-cell",
  },
  {
    header: "Semester",
    accessor: "student",
    className: "hidden md:table-cell",
  },
  {
    header: "Type",
    accessor: "type",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const ListScoreBoards = () => {
  const { hasAccessToken, currentUser } = useContext(AuthContext);
  const renderRows = (data) => {
    return data.map((item) => (
      <tr
        className="text-sm border-b-2 border-gray-100 even:bg-slate-100 hover:bg-webPurpleLight "
        key={item.id}
      >
        <td className="flex items-center p-4">
          <h2 className="text-[12px] font-semibold">{item.subject.name}</h2>
        </td>
        <td className="hidden lg:table-cell">{item.schoolYear.value}</td>
        <td className="hidden lg:table-cell">{item.class.name}</td>
        <td className="hidden md:table-cell">{item.semester.name}</td>
        <td className="table-cell">{item.typeOfExam.name}</td>
        {/* <td className="hidden lg:table-cell">{item.date}</td> */}
        <td>
          <div className="flex gap-4">
            <Link
              to={`/list/score-boards/${item.id}`}
              state={{
                subject: item.subject.name,
                schoolYear: item.schoolYear.value,
                className: item.class.name,
                semester: item.semester.name,
                typeOfExam: item.typeOfExam.name,
              }}
            >
              <button className="flex w-8 h-8 rounded-full bg-webSky items-center justify-center">
                <VisibilityOutlined
                  style={{ fontSize: 16, color: "whitesmoke" }}
                />
              </button>
            </Link>
            {currentUser.role.authorities
              .map((authority) => authority.name)
              .includes("Delete") ? (
              <FormModal table="score-board" type="delete" id={item.id} />
            ) : (
              <></>
            )}
          </div>
        </td>
      </tr>
    ));
  };
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

  const mutation = useMutation({
    mutationFn: () => {
      return navigate(location.pathname);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["score-boards"] });
    },
  });

  console.log(data);

  return (
    <div className="flex flex-col gap-4 flex-1 p-4 m-2 rounded-xl bg-white">
      {/* TOP */}
      <div className="flex flex-col lg:flex-row justify-between">
        <h1 className="hidden lg:block text-[18px] font-semibold">
          All Score Boards
        </h1>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex gap-4 items-center">
            <FormModal table="scoreBoard" type="filter" />
            <button
              onClick={(e) => {
                mutation.mutate();
              }}
              className="flex items-center justify-center w-4 h-4 p-4 rounded-full bg-webYellow"
            >
              <ReplayRounded fontSize="small" />
            </button>
            {currentUser.role.authorities
              .map((authority) => authority.name)
              .includes("Delete") ? (
              <FormModal table="scoreBoard" type="create" />
            ) : (
              <></>
            )}
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
