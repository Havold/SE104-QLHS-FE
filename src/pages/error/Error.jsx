import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen m-2 p-4 bg-white flex flex-col gap-3 items-center justify-center">
      <img
        className="w-[30%] "
        src="/assets/unauthorized.png"
        alt="unauthorized"
      />
      <h1 className="text-[40px] font-bold leading-tight">We are Sorry...</h1>
      <div className="text-[12px] text-center">
        <div className="">
          The page you're trying to access has restricted access.
        </div>
        <div className="">Please refer to your system administrator.</div>
      </div>
      <button
        className="text-[12px] font-bold text-white bg-webSkyBold hover:bg-webSky transition-colors rounded-full px-6 py-3"
        onClick={() => {
          navigate("/");
        }}
      >
        Back Home
      </button>
    </div>
  );
};

export default Error;
