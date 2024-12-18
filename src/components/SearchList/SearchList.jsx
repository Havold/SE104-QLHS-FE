import { SearchRounded } from "@mui/icons-material";
import React, { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const SearchList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputSearch, setInputSearch] = useState(
    searchParams.get("search") ? searchParams.get("search") : ""
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`${location.pathname}?search=${inputSearch}`, { replace: true });
  };

  return (
    <div className="flex w-[98%] items-center p-[6px] gap-2 rounded-[999px] border border-gray-300">
      <SearchRounded className="text-base text-[gray]" />
      <input
        className="w-full border-none text-[12px] bg-transparent focus:outline-none placeholder:text-[gray]"
        type="text"
        placeholder="Search..."
        name="search"
        value={inputSearch}
        onChange={(e) => {
          setInputSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
      />
    </div>
  );
};

export default SearchList;
