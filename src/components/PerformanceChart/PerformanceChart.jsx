import { MoreHorizRounded } from "@mui/icons-material";
import React from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 400, fill: "#C3EBFA" },
  { name: "Group B", value: 300, fill: "#FAE27C" },
];

const PerformanceChart = () => {
  return (
    <div className="w-full h-[300px] flex flex-col rounded-xl gap-2 p-3 bg-white custom-box-shadow">
      {/* TITLE */}
      <div className="flex items-center justify-between">
        <h1 className="text-[18px] font-semibold">Performance</h1>
        <MoreHorizRounded />
      </div>
      {/* CHART */}
      <div className="w-full h-full relative">
        <div className="flex flex-col absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[90%]">
          <h2 className="text-[32px] leading-8 font-semibold text-center">9.2</h2>
          <span className="text-[12px] text-gray-400 text-center">of 10 max LTS</span>
        </div>
        
        <div className="absolute bottom-20 left-[50%] -translate-x-[50%]">
            <span className="text-[12px] text-center">1st Semester - 2nd Semester</span>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
