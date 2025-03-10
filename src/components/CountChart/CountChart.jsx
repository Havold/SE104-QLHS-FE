import { MoreHorizRounded } from "@mui/icons-material";
import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const CountChart = ({ totalMale, totalFemale }) => {
  let totals = totalMale + totalFemale;
  const data = [
    {
      name: "Totals",
      count: totals,
      fill: "white",
    },
    {
      name: "Boys",
      count: totalMale,
      fill: "#C3EBFA",
    },
    {
      name: "Girls",
      count: totalFemale,
      fill: "#FAE27C",
    },
  ];

  return (
    <div className="flex flex-col w-full h-full rounded-2xl bg-white p-4 custom-box-shadow">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h2 className="text-[18px] font-semibold">Students</h2>
        <MoreHorizRounded className="cursor-pointer" />
      </div>
      {/* CHARTS */}
      <div className="w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar minAngle={15} background clockWise dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      {/* BOTTOM */}
      <div className="flex justify-center item-center gap-8">
        <div className="flex flex-col items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-webSky"></div>
          <h1 className="text-xl font-bold">{totalMale}</h1>
          <h2 className="text-sm text-gray-300 font-light">{`Boys (${(
            (totalMale / totals) *
            100
          ).toFixed(2)}%)`}</h2>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-webYellow"></div>
          <h1 className="text-xl font-bold">{totalFemale}</h1>
          <h2 className="text-sm text-gray-300 font-light">{`Girls (${(
            (totalFemale / totals) *
            100
          ).toFixed(2)}%)`}</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
