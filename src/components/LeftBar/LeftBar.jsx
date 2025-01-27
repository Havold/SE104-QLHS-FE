import {
  AccountCircleOutlined,
  CalendarMonthOutlined,
  CampaignOutlined,
  Diversity3Outlined,
  FactCheckOutlined,
  FormatListNumberedOutlined,
  HistoryEduOutlined,
  HomeOutlined,
  HourglassBottomOutlined,
  HouseOutlined,
  LocalLibraryOutlined,
  LogoutRounded,
  Numbers,
  PeopleAltOutlined,
  ReceiptLongOutlined,
  SettingsSuggestOutlined,
  SubjectOutlined,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { toast } from "react-toastify";

const LeftBar = ({ className }) => {
  const { setHasAccessToken, currentUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const menus = [
    {
      title: "MENU",
      items: [
        {
          id: 1,
          icon: <HomeOutlined fontSize="small" />,
          title: "Home",
          href: "/",
          // visible: ["admin", "teacher", "parent", "student"],
          visible: true,
        },
        // {
        //   id: 2,
        //   icon: <SchoolOutlined fontSize="small" />,
        //   title: "Teachers",
        //   href: "/list/teachers",
        //   visible: ["admin", "teacher"],
        // },
        {
          id: 3,
          icon: <PeopleAltOutlined fontSize="small" />,
          title: "Students",
          href: "/list/students",
          visible: currentUser.role.authorities
            .map((authority) => authority.name)
            .includes("View"),
        },
        // {
        //   id: 4,
        //   icon: <EscalatorWarningOutlined fontSize="small" />,
        //   title: "Parents",
        //   href: "/list/parents",
        //   visible: ["admin", "teacher"],
        // },
        {
          id: 5,
          icon: <SubjectOutlined fontSize="small" />,
          title: "Subjects",
          href: "/list/subjects",
          visible: currentUser.role.authorities
            .map((authority) => authority.name)
            .includes("View"),
        },
        {
          id: 6,
          icon: <HouseOutlined fontSize="small" />,
          title: "Classes",
          href: "/list/classes",
          visible: currentUser.role.authorities
            .map((authority) => authority.name)
            .includes("View"),
        },
        {
          id: 7,
          icon: <Numbers fontSize="small" />,
          title: "Grades",
          href: "/list/grades",
          visible: currentUser.role.authorities
            .map((authority) => authority.name)
            .includes("View"),
        },

        {
          id: 8,
          icon: <LocalLibraryOutlined fontSize="small" />,
          title: "Detail Classes",
          href: "/list/detail-classes",
          visible: currentUser.role.authorities
            .map((authority) => authority.name)
            .includes("View"),
        },
        {
          id: 9,
          icon: <HourglassBottomOutlined fontSize="small" />,
          title: "School Years",
          href: "/list/school-years",
          visible: currentUser.role.authorities
            .map((authority) => authority.name)
            .includes("View"),
        },
        // {
        //   id: 7,
        //   icon: <LocalLibraryOutlined fontSize="small" />,
        //   title: "Lessons",
        //   href: "/list/lessons",
        //   visible: ["admin", "teacher"],
        // },
        // {
        //   id: 8,
        //   icon: <HomeWorkOutlined fontSize="small" />,
        //   title: "Exams",
        //   href: "/list/exams",
        //   visible: ["admin", "teacher", "parent", "student"],
        // },
        // {
        //   id: 9,
        //   icon: <AssignmentOutlined fontSize="small" />,
        //   title: "Assignments",
        //   href: "/list/assignments",
        //   visible: ["admin", "teacher", "parent", "student"],
        // },
        {
          id: 10,
          icon: <FactCheckOutlined fontSize="small" />,
          title: "Score boards",
          href: "/list/score-boards",
          visible: true,
        },
        {
          id: 11,
          icon: <HistoryEduOutlined fontSize="small" />,
          title: "Subject Reports",
          href: "/list/subject-reports",
          visible: currentUser.role.authorities
            .map((authority) => authority.name)
            .includes("View"),
        },
        {
          id: 12,
          icon: <ReceiptLongOutlined fontSize="small" />,
          title: "Semester Reports",
          href: "/list/semester-reports",
          visible: currentUser.role.authorities
            .map((authority) => authority.name)
            .includes("View"),
        },
        {
          id: 20,
          icon: <FormatListNumberedOutlined fontSize="small" />,
          title: "Rules",
          href: "/list/rules",
          visible: currentUser.role.authorities
            .map((authority) => authority.name)
            .includes("View"),
        },
        {
          id: 13,
          icon: <Diversity3Outlined fontSize="small" />,
          title: "Attendance",
          href: "/list/attendance",
          visible: false,
        },
        {
          id: 14,
          icon: <CalendarMonthOutlined fontSize="small" />,
          title: "Events",
          href: "/list/events",
          visible: false,
        },
        {
          id: 15,
          icon: <CampaignOutlined fontSize="small" />,
          title: "Announcements",
          href: "/list/announcements",
          visible: false,
        },
      ],
    },
    {
      title: "OTHER",
      items: [
        {
          id: 1,
          icon: <AccountCircleOutlined fontSize="small" />,
          title: "Profile",
          href: `/list/students/${currentUser.id}`,
          visible: true,
        },
        {
          id: 2,
          icon: <SettingsSuggestOutlined fontSize="small" />,
          title: "Settings",
          href: "/settings",
          visible: false,
        },
        {
          id: 3,
          icon: <LogoutRounded className="text-xl" />,
          title: "Logout",
          onClick: async () => {
            await makeRequest.post("/auth/logout");
            setHasAccessToken(false);
            toast("Logout successfully!", { type: "success" });
            navigate("/login");
          },
          visible: true,
        },
      ],
    },
  ];
  return (
    <div
      className={
        className +
        " overflow-auto custom-scrollbar-transparent hover:custom-scrollbar-hover bg-white custom-box-shadow "
      }
    >
      <div className="flex items-center justify-center p-1">
        <h1 className="text-2xl font-medium cursor-pointer text-center ">
          METAN
        </h1>
      </div>
      <div className="flex flex-col gap-[10px]">
        {menus.map((menu, index) => {
          return (
            <div key={index} className="flex flex-col gap-[10px]">
              <h3 className="font-extralight text-[gray] text-base">
                {menu.title}
              </h3>
              <div className="flex flex-col gap-2">
                {menu.items.map((item) => {
                  if (item.visible)
                    return (
                      <Link onClick={item.onClick} key={item.id} to={item.href}>
                        <div
                          className={`flex gap-2 items-center p-2 text-[gray] font-normal cursor-pointer hover:bg-webSkyLight ${
                            location.pathname === item.href
                              ? "bg-webSkyLight text-black"
                              : ""
                          }`}
                        >
                          {item.icon}
                          <span className="hidden lg:block text-[12px]">
                            {item.title}
                          </span>
                        </div>
                      </Link>
                    );
                  return null;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeftBar;
