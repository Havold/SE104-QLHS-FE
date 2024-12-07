import { SearchRounded } from "@mui/icons-material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    params.set("search", e.target.elements.search.value);
    navigate(`${location.pathname}?${params}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-[98%] items-center p-[6px] gap-2 rounded-[999px] border border-gray-300"
    >
      <SearchRounded className="text-base text-[gray]" />
      <input
        className="w-full border-none text-[12px] bg-transparent focus:outline-none placeholder:text-[gray]"
        type="text"
        placeholder="Search..."
        name="search"
      />
    </form>
  );
};

export default SearchList;
