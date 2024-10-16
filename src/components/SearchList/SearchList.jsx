import { SearchRounded } from "@mui/icons-material";
import React from "react";

const SearchList = () => {
  return (
    <div className="flex w-[98%] items-center p-[6px] gap-2 rounded-[999px] border border-gray-300">
      <SearchRounded className="text-base text-[gray]" />
      <input
        className="border-none text-[12px] bg-transparent focus:outline-none placeholder:text-[gray]"
        type="text"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchList;
