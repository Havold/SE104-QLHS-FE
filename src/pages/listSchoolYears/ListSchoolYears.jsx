import React, { useEffect, useState } from "react";
import SearchList from "../../components/SearchList/SearchList";
import {
  AddRounded,
  DeleteOutline,
  EditOutlined,
  ReplayRounded,
  SortRounded,
  TuneRounded,
} from "@mui/icons-material";
import Pagination from "../../components/Pagination/Pagination";
import Table from "../../components/Table/Table";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { role, subjectsData } from "../../lib/data";
import FormModal from "../../components/FormModal/FormModal";
import { makeRequest } from "../../axios";
import { ITEMS_PER_PAGE } from "../../lib/settings";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const columns = [
  {
    header: "School Year",
    accessor: "schoolYear",
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
          <h2 className="text-[12px] font-semibold">{item.value}</h2>
        </td>
        <td>
          <div className="flex gap-4">
            <FormModal table="schoolYear" type="edit" data={item} />
            {role === "admin" ? (
              <FormModal table="school-year" type="delete" id={item.id} />
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

const ListSchoolYears = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Lấy giá trị search từ URL query parameters
  const search = searchParams.get("search")?.trim();

  // Kiểm tra nếu search không phải là số
  useEffect(() => {
    if (search && isNaN(Number(search))) {
      toast.error("Search input must be a number!");
      // Xóa tham số `search` khỏi URL nếu không hợp lệ
      setSearchParams((prevParams) => {
        prevParams.delete("search");
        return prevParams;
      });
    }
  }, [search, setSearchParams]);

  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  let page = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;
  let pageItems = searchParams.get("pageItems")
    ? parseInt(searchParams.get("pageItems"))
    : ITEMS_PER_PAGE;

  const { isPending, error, data } = useQuery({
    queryKey: ["school-years"],
    queryFn: () => {
      const queryString = new URLSearchParams(searchParams);
      queryString.set("page", page);
      queryString.set("pageItems", pageItems);
      return makeRequest.get(`/school-years?${queryString}`).then((res) => {
        return res.data;
      });
    },
    enabled: !search || !isNaN(Number(search)), // Chỉ thực hiện query nếu search là số hoặc rỗng
  });

  const mutation = useMutation({
    mutationFn: () => {
      return navigate(location.pathname);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["school-years"] });
    },
  });

  return (
    <div className="flex flex-col gap-4 flex-1 p-4 m-2 rounded-xl bg-white custom-page-animation">
      {/* TOP */}
      <div className="flex flex-col lg:flex-row justify-between">
        <h1 className="hidden lg:block text-[18px] font-semibold">
          All School Years
        </h1>
        <div className="flex flex-col lg:flex-row gap-4">
          <SearchList table="school-years" />
          <div className="flex gap-4 items-center">
            <button
              onClick={(e) => {
                mutation.mutate();
              }}
              className="flex items-center justify-center w-4 h-4 p-4 rounded-full bg-webYellow"
            >
              <ReplayRounded fontSize="small" />
            </button>
            <FormModal table="schoolYear" type="create" />
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
          data={data.schoolYears}
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

export default ListSchoolYears;
