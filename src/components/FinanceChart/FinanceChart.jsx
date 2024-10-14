import {MoreHorizRounded } from "@mui/icons-material";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    income: 4000,
    expense: 2800,
  },
  {
    name: "Feb",
    income: 2000,
    expense: 2400,
  },
  {
    name: "Mar",
    income: 3000,
    expense: 2200,
  },
  {
    name: "Apr",
    income: 3400,
    expense: 2100,
  },
  {
    name: "May",
    income: 3200,
    expense: 1200,
  },
  {
    name: "Jun",
    income: 4000,
    expense: 2800,
  },
  {
    name: "Jul",
    income: 3400,
    expense: 2100,
  },
  {
    name: "Aug",
    income: 1200,
    expense: 4200,
  },
  {
    name: "Sep",
    income: 4200,
    expense: 1400,
  },
  {
    name: "Oct",
    income: 3400,
    expense: 2300,
  },
  {
    name: "Nov",
    income: 4000,
    expense: 2800,
  },
  {
    name: "Dec",
    income: 3400,
    expense: 2200,
  },
];

const FinanceChart = () => {
  return (
    <div className="w-full h-full bg-white rounded-2xl p-4">
        {/* TITLE */}
        <div className="flex justify-between items-center">
            <h2 className="text-[18px] font-semibold" >Finance</h2>
            <MoreHorizRounded className="cursor-pointer" />
        </div>
        <div className="w-full h-[90%]">
          {" "}
          <ResponsiveContainer>
            <LineChart
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
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd"/>
              <XAxis
              tickLine={false}
                tick={{ fontSize: "12px", fill: "#d1d5db" }}
                axisLine={false}
                dataKey="name"
              />
              <YAxis
                tickLine={false}
                tick={{ fontSize: "12px", fill: "#d1d5db" }}
                axisLine={false}
              />
              <Tooltip contentStyle={{borderRadius: 10, borderColor: '#ddds', fontSize: '12px'}} />
              <Legend
                align="center"
                verticalAlign="top"
                wrapperStyle={{ fontSize: "12px", paddingBottom: "20px" }}
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#C3EBFA"
                strokeWidth={4}
              />
              <Line type="monotone" dataKey="expense" stroke="#CFCEFF" strokeWidth={4} />
            </LineChart>
          </ResponsiveContainer>
        </div>
    </div>
  );
};

export default FinanceChart;
