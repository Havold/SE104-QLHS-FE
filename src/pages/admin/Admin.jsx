import { useEffect, useState } from "react";
import Announcements from "../../components/Announcements/Announcements";
import AttendanceChart from "../../components/AttendanceChart/AttendanceChart";
import CountChart from "../../components/CountChart/CountChart";
import EventCalendar from "../../components/EventCalendar/EventCalendar";
import FinanceChart from "../../components/FinanceChart/FinanceChart";
import UserCard from "../../components/UserCard/UserCard";
import { makeRequest } from "../../axios";

const Admin = () => {
  const [students, setStudents] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data = (await makeRequest("/students")).data;
      setStudents(data);
    };
    fetchData();
  }, []);

  console.log(students);
  const data = [
    {
      type: "students",
      date: "2024/25",
      total: students?.totalCount,
    },
    {
      type: "teachers",
      date: "2024/25",
      total: "0",
    },
    {
      type: "parents",
      date: "2024/25",
      total: "0",
    },
    {
      type: "staffs",
      date: "2024/25",
      total: "0",
    },
  ];
  return (
    <div className="flex p-2">
      {/* LEFT */}
      <div className="flex flex-col gap-2 w-full lg:w-2/3">
        {/* TOP */}
        <div className="flex justify-between flex-wrap gap-4">
          {data.map((item, index) => {
            return (
              <UserCard
                key={index}
                type={item.type}
                date={item.date}
                total={item.total}
              />
            );
          })}
        </div>
        {/* CENTER */}
        <div className="flex gap-2 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
          </div>
        </div>
        {/* BOTTOM */}
        <div className="w-full h-[450px]">
          <FinanceChart />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-2 pl-2">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default Admin;
