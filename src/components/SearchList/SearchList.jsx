import { SearchRounded } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../lib/settings";

const SearchList = ({ table, type = "table" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  let pageItems = searchParams.get("pageItems")
    ? parseInt(searchParams.get("pageItems"))
    : ITEMS_PER_PAGE;
  const [inputSearch, setInputSearch] = useState(
    searchParams.get("search") ? searchParams.get("search") : ""
  );
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (inputSearch) => {
      // navigate(`${location.pathname}?search=${inputSearch}`, { replace: true });
      searchParams.set("search", inputSearch);
      const queryString = new URLSearchParams(searchParams);
      queryString.set("page", 1);
      queryString.set("pageItems", pageItems);
      navigate(`${location.pathname}?${queryString}`, { replace: true });
    },
    onSuccess: () => {
      if (type === "table")
        queryClient.invalidateQueries({ queryKey: [table] });
      else queryClient.invalidateQueries({ queryKey: [table, type] });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(inputSearch);
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
