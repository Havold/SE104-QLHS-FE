import {
  AccountCircleOutlined,
  AssignmentOutlined,
  CalendarMonthOutlined,
  CampaignOutlined,
  Diversity3Outlined,
  EscalatorWarningOutlined,
  FactCheckOutlined,
  HomeOutlined,
  HomeWorkOutlined,
  HouseOutlined,
  LocalLibraryOutlined,
  LogoutRounded,
  PeopleAltOutlined,
  ReviewsOutlined,
  SchoolOutlined,
  SettingsSuggestOutlined,
} from "@mui/icons-material";
import { role } from "../../lib/data";
import { Link } from "react-router-dom";

const LeftBar = ({ className }) => {
  const menus = [
    {
      title: "MENU",
      items: [
        {
          id: 1,
          icon: <HomeOutlined fontSize="small" />,
          title: "Home",
          href: "/",
          visible: ["admin", "teacher", "parent", "student"],
        },
        {
          id: 2,
          icon: <SchoolOutlined fontSize="small" />,
          title: "Teachers",
          href: "/list/teachers",
          visible: ["admin", "teacher"],
        },
        {
          id: 3,
          icon: <PeopleAltOutlined fontSize="small" />,
          title: "Students",
          href: "/list/students",
          visible: ["admin", "teacher"],
        },
        {
          id: 4,
          icon: <EscalatorWarningOutlined fontSize="small" />,
          title: "Parents",
          href: "/parents",
          visible: ["admin", "teacher"],
        },
        {
          id: 5,
          icon: <HouseOutlined fontSize="small" />,
          title: "Classes",
          href: "/classes",
          visible: ["admin", "teacher"],
        },
        {
          id: 6,
          icon: <LocalLibraryOutlined fontSize="small" />,
          title: "Lessons",
          href: "/lessons",
          visible: ["admin", "teacher"],
        },
        {
          id: 7,
          icon: <HomeWorkOutlined fontSize="small" />,
          title: "Exams",
          href: "/exams",
          visible: ["admin", "teacher", "parent", "student"],
        },
        {
          id: 8,
          icon: <AssignmentOutlined fontSize="small" />,
          title: "Assignments",
          href: "/assignments",
          visible: ["admin", "teacher", "parent", "student"],
        },
        {
          id: 9,
          icon: <FactCheckOutlined fontSize="small" />,
          title: "Results",
          href: "/results",
          visible: ["admin", "teacher", "parent", "student"],
        },
        {
          id: 10,
          icon: <Diversity3Outlined fontSize="small" />,
          title: "Attendance",
          href: "/attendance",
          visible: ["admin", "teacher", "parent", "student"],
        },
        {
          id: 11,
          icon: <CalendarMonthOutlined fontSize="small" />,
          title: "Events",
          href: "/events",
          visible: ["admin", "teacher", "parent", "student"],
        },
        {
          id: 12,
          icon: <ReviewsOutlined fontSize="small" />,
          title: "Messages",
          href: "/messages",
          visible: ["admin", "teacher", "parent", "student"],
        },
        {
          id: 13,
          icon: <CampaignOutlined fontSize="small" />,
          title: "Announcement",
          href: "/announcement",
          visible: ["admin", "teacher", "parent", "student"],
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
          href: "/profile",
          visible: ["admin", "teacher", "parent", "student"],
        },
        {
          id: 2,
          icon: <SettingsSuggestOutlined fontSize="small" />,
          title: "Settings",
          href: "/settings",
          visible: ["admin", "teacher", "parent", "student"],
        },
        {
          id: 3,
          icon: <LogoutRounded className="text-xl" />,
          title: "Logout",
          href: "/logout",
          visible: ["admin", "teacher", "parent", "student"],
        },
      ],
    },
  ];
  return (
    <div
      className={
        className +
        " overflow-auto custom-scrollbar-transparent hover:custom-scrollbar-hover "
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
                  if (item.visible.includes(role))
                    return (
                      <Link to={item.href}>
                        <div
                          key={item.id}
                          className="flex gap-2 items-center p-2 text-[gray] font-normal cursor-pointer hover:bg-webSkyLight"
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
