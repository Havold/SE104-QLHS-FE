import React from "react";

const Announcements = () => {
  return (
    <div className="flex flex-col bg-white p-3 rounded-2xl">
      <div className="flex items-center justify-between">
        <h3 className="text-[18px] font-semibold">Announcements</h3>
        <span className="text-[12px] text-gray-400 cursor-pointer">View All</span>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex flex-col bg-webSkyLight p-4 rounded-md gap-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">
              Lorem ipsum dolor sit
            </h3>
            <span className="text-[10px] text-gray-400 bg-white p-1 rounded-lg ">
              2025-01-01
            </span>
          </div>
          <p className="text-[12px] text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisquam
            corporis reiciendis aliquam minus...
          </p>
        </div>
        <div className="flex flex-col bg-webPurpleLight p-4 rounded-md gap-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">
              Lorem ipsum dolor sit
            </h3>
            <span className="text-[10px] text-gray-400 bg-white p-1 rounded-lg ">
              2025-01-01
            </span>
          </div>
          <p className="text-[12px] text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisquam
            corporis reiciendis aliquam minus...
          </p>
        </div>
        <div className="flex flex-col bg-webYellowLight p-4 rounded-md gap-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">
              Lorem ipsum dolor sit
            </h3>
            <span className="text-[10px] text-gray-400 bg-white p-1 rounded-lg ">
              2025-01-01
            </span>
          </div>
          <p className="text-[12px] text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisquam
            corporis reiciendis aliquam minus...
          </p>
        </div>
      </div>
      </div>
  );
};

export default Announcements;
