import React from "react";
import { ITEMS_PER_PAGE } from "../../lib/settings";
import { useLocation, useNavigate } from "react-router-dom";

const Pagination = ({ page, total }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const canNext = total - ITEMS_PER_PAGE * page > 0;
  const canPrev = page > 1;
  const changePage = (number) => {
    params.set("page", number);
    navigate(`${location.pathname}?${params}`);
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
