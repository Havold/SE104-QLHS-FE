import {
  BoyRounded,
  BusinessCenterRounded,
  CakeRounded,
  EmailRounded,
  HouseRounded,
  LocalLibraryRounded,
  LocalPhoneRounded,
  LockClockRounded,
  SchoolRounded,
} from "@mui/icons-material";
import BigCalendar from "../../components/BigCalendar/BigCalendar";
import Announcements from "../../components/Announcements/Announcements";
import { Link, useLocation } from "react-router-dom";
import PerformanceChart from "../../components/PerformanceChart/PerformanceChart";
import FormModal from "../../components/FormModal/FormModal";
import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";

const StudentProfile = () => {
  const [student, setStudent] = useState("");
  const studentId = useLocation().pathname.split("/")[3];
  const { isPending, error, data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      return makeRequest.get(`/students/${studentId}`).then((res) => {
        return res.data;
      });
    },
  });

  console.log(student);
  return (
    <div className="flex flex-col xl:flex-row flex-1 gap-3 p-4 m-2 rounded-xl">
      {/* LEFT */}
      <div className="flex flex-col gap-4 w-full xl:w-2/3">
        {/* TOP */}
        {error ? (
          "Something went wrong!"
        ) : isPending ? (
          "Loading... "
        ) : (
          <div className="flex flex-col gap-2 md:flex-row">
            {/* USER CARD */}
            <div className="flex flex-1 p-4 gap-4 items-center bg-webSky rounded-xl custom-box-shadow">
              <img
                className="w-[160px] h-[160px] rounded-full object-cover"
                src={
                  data.img
                    ? `${process.env.REACT_APP_API_URL}${data.img}`
                    : "/assets/noAvatar.jpg"
                }
                alt="profilePic"
              />
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <h2 className="text-[24px] font-semibold">{data.fullName}</h2>
                  <FormModal type="edit" table="student" data={data} />
                </div>
                <p className="text-[16px] text-gray-400">{data.address}</p>
                {/* Information item */}
                <div className="flex flex-wrap gap-1">
                  <div className="w-full sm:w-[48%] md:w-full lg:w-[48%] xl:w-full flex gap-1 items-center">
                    <LockClockRounded style={{ fontSize: 14 }} />
                    <span className="text-[12px]">{data?.role?.name}</span>
                  </div>
                  <div className="w-full sm:w-[48%] md:w-full lg:w-[48%] xl:w-full flex gap-1 items-center">
                    <CakeRounded style={{ fontSize: 14 }} />
                    <span className="text-[12px]">
                      {moment(data.birth).format("MMM Do YYYY")}
                    </span>
                  </div>
                  <div className="w-full sm:w-[48%] md:w-full lg:w-[48%] xl:w-full flex gap-1 items-center">
                    <EmailRounded style={{ fontSize: 14 }} />
                    <span className="text-[12px]">{data.email}</span>
                  </div>
                  <div className="w-full sm:w-[48%] md:w-full lg:w-[48%] xl:w-full flex gap-1 items-center">
                    <LocalPhoneRounded style={{ fontSize: 14 }} />
                    <span className="text-[12px]">{data.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ITEM CARD */}
            <div className="flex-1 flex justify-center gap-2 flex-wrap">
              <div className="w-full sm:w-[48%] md:w-full lg:w-[48%] flex items-center gap-3 p-4 rounded-xl bg-white custom-box-shadow">
                <BusinessCenterRounded
                  style={{ fontSize: 28, color: "#CFCEFF" }}
                />
                <div className="flex flex-col">
                  <h3 className="text-[20px] font-medium">90%</h3>
                  <span className="text-[14px] text-gray-400">Attendance</span>
                </div>
              </div>
              <div className="w-full sm:w-[48%] md:w-full lg:w-[48%] flex items-center gap-3 p-4 rounded-xl bg-white custom-box-shadow">
                <SchoolRounded style={{ fontSize: 28, color: "#CFCEFF" }} />
                <div className="flex flex-col">
                  <h3 className="text-[20px] font-medium">
                    {data.studentClasses ? (
                      data.studentClasses[0]?.classSchoolYear.class.grade.level
                    ) : (
                      <></>
                    )}
                  </h3>
                  <span className="text-[14px] text-gray-400">Grade</span>
                </div>
              </div>
              <div className="w-full sm:w-[48%] md:w-full lg:w-[48%] flex items-center gap-3 p-4 rounded-xl bg-white custom-box-shadow">
                <LocalLibraryRounded
                  style={{ fontSize: 28, color: "#CFCEFF" }}
                />
                <div className="flex flex-col">
                  <h3 className="text-[20px] font-medium">18</h3>
                  <span className="text-[14px] text-gray-400">
                    Average Score
                  </span>
                </div>
              </div>
              <div className="w-full sm:w-[48%] md:w-full lg:w-[48%] flex items-center gap-3 p-4 rounded-xl bg-white custom-box-shadow">
                <HouseRounded style={{ fontSize: 28, color: "#CFCEFF" }} />
                <div className="flex flex-col">
                  <h3 className="text-[20px] font-medium">
                    {data.studentClasses ? (
                      data.studentClasses[0]?.classSchoolYear.class.name
                    ) : (
                      <></>
                    )}
                  </h3>
                  <span className="text-[14px] text-gray-400">Class</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM */}
        <div className="flex flex-col bg-white rounded-xl p-4 custom-box-shadow">
          <h1 className="text-[16px] font-semibold">Student's Schedule</h1>
          <BigCalendar />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col gap-2 w-full xl:w-1/3">
        {/* SHORTCUTS */}
        <div className="flex flex-col rounded-xl gap-2 p-3 bg-white custom-box-shadow">
          <h1 className="text-[18px] font-semibold">Shortcuts</h1>
          <div className="flex flex-wrap gap-2">
            <Link
              className="text-[12px] font-light p-2 rounded-md bg-webSkyLight"
              to={`/list/classes`}
            >
              Student's Classes
            </Link>
            <Link
              className="text-[12px] font-light p-2 rounded-md bg-webPurpleLight"
              to={`/list/results`}
            >
              Student's Results
            </Link>
          </div>
        </div>
        {/* PERFORMANCE CHART */}
        <PerformanceChart />
        {/* ANNOUNCEMENTS */}
        <Announcements />
      </div>
    </div>
  );
};

export default StudentProfile;
