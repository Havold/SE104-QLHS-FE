import {
  AssignmentRounded,
  BusinessCenterRounded,
  CakeRounded,
  EditOutlined,
  EmailRounded,
  HouseRounded,
  LocalLibraryRounded,
  LocalPhoneRounded,
  StarRounded,
} from "@mui/icons-material";
import BigCalendar from "../../components/BigCalendar/BigCalendar";
import Announcements from "../../components/Announcements/Announcements";
import { Link } from "react-router-dom";
import PerformanceChart from "../../components/PerformanceChart/PerformanceChart";
import FormModal from "../../components/FormModal/FormModal";

const TeacherProfile = () => {
  const avatar =
    "https://i.pinimg.com/564x/97/bb/06/97bb067e30ff6b89f4fbb7b9141025ca.jpg";

  return (
    <div className="flex flex-col xl:flex-row flex-1 gap-3 p-4 m-2 rounded-xl">
      {/* LEFT */}
      <div className="flex flex-col gap-4 w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col gap-2 md:flex-row">
          {/* USER CARD */}
          <div className="flex flex-1 p-4 gap-4 items-center bg-webSky rounded-xl custom-box-shadow">
            <img
              className="w-[160px] h-[160px] rounded-full object-cover"
              src={avatar}
              alt="profilePic"
            />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-[24px] font-semibold">Dean Guerrero</h2>
                <FormModal table='teacher' type='edit'/>
              </div>{" "}
              <p className="text-[16px] text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              {/* Information item */}
              <div className="flex flex-wrap gap-1">
                <div className="w-full sm:w-[48%] md:w-full lg:w-[48%] xl:w-full flex gap-1 items-center">
                  <StarRounded style={{ fontSize: 14 }} />
                  <span className="text-[12px]">A+</span>
                </div>
                <div className="w-full sm:w-[48%] md:w-full lg:w-[48%] xl:w-full flex gap-1 items-center">
                  <CakeRounded style={{ fontSize: 14 }} />
                  <span className="text-[12px]">January 2000</span>
                </div>
                <div className="w-full sm:w-[48%] md:w-full lg:w-[48%] xl:w-full flex gap-1 items-center">
                  <EmailRounded style={{ fontSize: 14 }} />
                  <span className="text-[12px]">test@gmail.com</span>
                </div>
                <div className="w-full sm:w-[48%] md:w-full lg:w-[48%] xl:w-full flex gap-1 items-center">
                  <LocalPhoneRounded style={{ fontSize: 14 }} />
                  <span className="text-[12px]">0833123123</span>
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
              <AssignmentRounded style={{ fontSize: 28, color: "#CFCEFF" }} />
              <div className="flex flex-col">
                <h3 className="text-[20px] font-medium">2</h3>
                <span className="text-[14px] text-gray-400">Branches</span>
              </div>
            </div>
            <div className="w-full sm:w-[48%] md:w-full lg:w-[48%] flex items-center gap-3 p-4 rounded-xl bg-white custom-box-shadow">
              <LocalLibraryRounded style={{ fontSize: 28, color: "#CFCEFF" }} />
              <div className="flex flex-col">
                <h3 className="text-[20px] font-medium">6</h3>
                <span className="text-[14px] text-gray-400">Lessons</span>
              </div>
            </div>
            <div className="w-full sm:w-[48%] md:w-full lg:w-[48%] flex items-center gap-3 p-4 rounded-xl bg-white custom-box-shadow">
              <HouseRounded style={{ fontSize: 28, color: "#CFCEFF" }} />
              <div className="flex flex-col">
                <h3 className="text-[20px] font-medium">6</h3>
                <span className="text-[14px] text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="flex flex-col bg-white rounded-xl p-4 custom-box-shadow">
          <h1 className="text-[16px] font-semibold">Teacher's Schedule</h1>
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
              Teacher's Classes
            </Link>
            <Link
              className="text-[12px] font-light p-2 rounded-md bg-webPurpleLight"
              to={`/list/classes`}
            >
              Teacher's Students
            </Link>
            <Link
              className="text-[12px] font-light p-2 rounded-md bg-webYellowLight"
              to={`/list/classes`}
            >
              Teacher's Lessons
            </Link>

            <Link
              className="text-[12px] font-light p-2 rounded-md bg-webPurpleLight"
              to={`/list/classes`}
            >
              Teacher's Exams
            </Link>
            <Link
              className="text-[12px] font-light p-2 rounded-md bg-webSkyLight"
              to={`/list/classes`}
            >
              Teacher's Assignments
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

export default TeacherProfile;
