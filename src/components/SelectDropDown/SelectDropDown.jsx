import { ArrowDropDownRounded } from "@mui/icons-material";
import React, { useState } from "react";

const SelectDropDown = ({
  options,
  selectedOption,
  onChange,
  displayKey = "name",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle selection
  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative w-full text-[12px]">
      {/* Selected value / button */}
      <div
        onClick={toggleDropdown}
        className="w-full p-2 h-[40px] leading-loose border border-gray-400 rounded-md text-left text-black bg-white transition-colors outline-none"
      >
        <ArrowDropDownRounded className="absolute right-0" />
        {options?.find((option) => option.id === selectedOption)?.[
          displayKey
        ] || "Select an option"}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <ul className="absolute z-10 w-full max-h-[100px] overflow-y-auto border border-gray-400 rounded-md bg-white shadow-md">
          {!options ? (
            <li className="p-2 text-gray-400">Loading...</li>
          ) : (
            options.map((option) => (
              <li
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`p-2 cursor-pointer hover:bg-blue-100 ${
                  option.id === selectedOption ? "bg-blue-200 font-bold" : ""
                }`}
              >
                {option[displayKey]}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SelectDropDown;
