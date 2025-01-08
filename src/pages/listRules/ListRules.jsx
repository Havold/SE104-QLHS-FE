import React, { useContext, useEffect, useState } from "react";
import SearchList from "../../components/SearchList/SearchList";
import { ReplayRounded, SortRounded, TuneRounded } from "@mui/icons-material";
import Pagination from "../../components/Pagination/Pagination";
import Table from "../../components/Table/Table";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { role } from "../../lib/data";
import { makeRequest } from "../../axios";
import { ITEMS_PER_PAGE } from "../../lib/settings";
import FormModal from "../../components/FormModal/FormModal";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const columns = [
  {
    header: "Name",
    accessor: "class",
  },
  {
    header: "Value",
    accessor: "grade",
    className: "hidden lg:table-cell",
  },
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
        <td className="hidden lg:table-cell">{item.value}</td>
        <td>
          <div className="flex gap-4">
            {role === "admin" ? (
              <>
                <FormModal table="rule" type="edit" data={item} />
                {/* <FormModal table="class" type="delete" id={item.id} /> */}
              </>
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

const ListRules = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page"))
    : 1;
  const pageItems = searchParams.get("pageItems")
    ? parseInt(searchParams.get("pageItems"))
    : ITEMS_PER_PAGE;

  const { isPending, error, data } = useQuery({
    queryKey: ["rules"],
    queryFn: () => {
      const queryString = new URLSearchParams(searchParams);
      queryString.set("page", page);
      queryString.set("pageItems", pageItems);
      return makeRequest.get(`/rules?${queryString}`).then((res) => {
        return res.data;
      });
    },
  });

  const mutation = useMutation({
    mutationFn: () => {
      return navigate(location.pathname);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rules"] });
    },
  });

  console.log(data);
  return (
    <div className="flex flex-col gap-4 flex-1 p-4 m-2 rounded-xl bg-white">
      {/* TOP */}
      <div className="flex flex-col lg:flex-row justify-between">
        <h1 className="hidden lg:block text-[18px] font-semibold">All Rules</h1>
        <div className="flex flex-col lg:flex-row gap-4">
          <SearchList table="rules" />
          <div className="flex gap-4 items-center">
            <button
              onClick={(e) => {
                mutation.mutate();
              }}
              className="flex items-center justify-center w-4 h-4 p-4 rounded-full bg-webYellow"
            >
              <ReplayRounded style={{ fontSize: 16 }} />
            </button>
            <button className="flex items-center justify-center w-4 h-4 p-4 rounded-full bg-webYellow">
              <SortRounded fontSize="small" />
            </button>
            {/* <FormModal table="class" type="create" /> */}
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
          data={data.parameters}
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

export default ListRules;
