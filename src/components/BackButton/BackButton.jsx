import { ArrowBack } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

const BackButton = () => {
  return (
    <>
      <Link to={-1}>
        <div className="h-10 w-10 flex items-center justify-center rounded-full mb-2 hover:bg-white hover:custom-box-shadow-darker  transition-colors">
          <ArrowBack fontSize="small" />
        </div>
      </Link>
    </>
  );
};

export default BackButton;
