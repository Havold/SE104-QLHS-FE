import { MoreHorizRounded } from "@mui/icons-material";
import React from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

const CountChart = () => {
  const data = [
    {
      name: "Totals",
      count: 104,
      fill: "white",
    },
    {
      name: "Boys",
      count: 52,
      fill: "#C3EBFA",
    },
    {
      name: "Girls",
      count: 52,
      fill: "#FAE27C",
    },
  ];

  return (
    <div className="flex flex-col w-full h-full rounded-2xl bg-white p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h2 className="text-[18px] font-bold">Students</h2>
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
            <RadialBar
              minAngle={15}
              background
              clockWise
              dataKey="count"
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      {/* BOTTOM */}
      <div className="flex justify-center item-center gap-8">
        <div className="flex flex-col items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-webSky"></div>
          <h1 className="text-xl font-bold">1,234</h1>
          <h2 className="text-sm text-gray-300 font-light">Boys (65%)</h2>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-webYellow"></div>
          <h1 className="text-xl font-bold">1,234</h1>
          <h2 className="text-sm text-gray-300 font-light">Girls (35%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
