import React from "react";
import SearchList from "../../components/SearchList/SearchList";
import { AddRounded, SortRounded, TuneRounded } from "@mui/icons-material";

const ListTeachers = () => {
  return (
    <div className="flex flex-col flex-1 p-4 m-2 rounded-xl bg-white">
      {/* TOP */}
      <div className="flex flex-col lg:flex-row justify-between">
        <h1 className="hidden lg:block text-[18px] font-semibold">All Teachers</h1>
        <div className="flex flex-col lg:flex-row gap-4">
          <SearchList />
          <div className="flex gap-4">
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

      {/* PAGINATION */}
      <div className="flex items-center justify-between">
        <button className="py-2 px-4 text-[14px] bg-gray-200 rounded-md hover:opacity-90 disabled:opacity-40">Prev</button>
        <div className="flex items-center gap-2">
          <button className="py-2 px-3 bg-webSky text-[14px] rounded-md">1</button>
          <button className="p-2 text-[14px] rounded-md">2</button>
          <button className="p-2 text-[14px] rounded-md">3</button>
          ...
          <button className="p-2 text-[14px] rounded-md">10</button>
        </div>
        <button className="py-2 px-4 text-[14px] bg-gray-200 rounded-md hover:opacity-90 disabled:opacity-40">Next</button>
      </div>
    </div>
  );
};

export default ListTeachers;
