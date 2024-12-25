import React from "react";
import { ITEMS_PER_PAGE } from "../../lib/settings";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Pagination = ({ page, total, type = "table" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const table = location.pathname.split("/")[2];
  const queryClient = useQueryClient();
  const params = new URLSearchParams(location.search);
  const canNext = total - ITEMS_PER_PAGE * page > 0;
  const canPrev = page > 1;

  const mutation = useMutation({
    mutationFn: () => {},
    onSuccess: () => {
      if (type === "table") {
        queryClient.invalidateQueries({ queryKey: [`${table}`] });
      } else {
        queryClient.invalidateQueries({ queryKey: [`${table}, ${type}`] });
      }
    },
  });
  const changePage = (number) => {
    if (type === "table") {
      params.set("page", number);
    } else {
      params.set("subPage", number);
    }
    navigate(`${location.pathname}?${params}`);
    mutation.mutate();
  };

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={() => changePage(page - 1)}
        disabled={!canPrev}
        className="py-2 px-4 text-[14px] bg-gray-200 rounded-md hover:opacity-90 disabled:opacity-40"
      >
        Prev
      </button>
      <div className="flex items-center gap-2">
        {Array.from(
          { length: Math.ceil(total / ITEMS_PER_PAGE) },
          (_, index) => {
            const pageIndex = index + 1;
            return (
              <button
                key={index}
                onClick={() => changePage(pageIndex)}
                className={`py-2 px-3 ${
                  pageIndex === page ? "bg-webSky" : ""
                }  text-[14px] rounded-md`}
              >
                {pageIndex}
              </button>
            );
          }
        )}
      </div>
      <button
        disabled={!canNext}
        onClick={() => changePage(page + 1)}
        className="py-2 px-4 text-[14px] bg-gray-200 rounded-md hover:opacity-90 disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
