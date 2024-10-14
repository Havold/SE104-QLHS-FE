import { MoreHorizRounded } from "@mui/icons-material";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Mon",
    boys: 12,
    girls: 24,
  },
  {
    name: "Tue",
    boys: 14,
    girls: 21,
  },
  {
    name: "Wed",
    boys: 10,
    girls: 28,
  },
  {
    name: "Thurs",
    boys: 8,
    girls: 12,
  },
  {
    name: "Fri",
    boys: 13,
    girls: 22,
  },
  {
    name: "Sat",
    boys: 4,
    girls: 5,
  },
];

const AttendanceChart = () => {
  return (
    <div className="w-full h-full rounded-2xl bg-white p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-[18px] font-semibold">Attendance</h2>
        <MoreHorizRounded className="cursor-pointer" />
      </div>
      <ResponsiveContainer width="100%" height="95%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#ddd' />
          <XAxis tick={{fill: '#d1d5db', fontSize: '12px'}} axisLine={false} tickLine={false} dataKey="name" />
          <YAxis tick={{fill: '#d1d5db', fontSize: '12px'}} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{borderRadius: '8px', borderColor: 'transparent', fontSize: '12px'}} />
          <Legend align="left" verticalAlign="top" wrapperStyle={{paddingTop: 4, paddingBottom: 20, fontSize: "14px"}}/>
          <Bar
            dataKey="boys"
            fill="#C3EBFA"
            legendType="circle"
            radius={[12,12,0,0]}
          />
          <Bar
            dataKey="girls"
            fill="#FAE27C"
            legendType="circle"
            radius={[12,12,0,0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
