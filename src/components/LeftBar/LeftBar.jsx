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
  SubjectOutlined,
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
          visible: ["admin", "teacher"],
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
          visible: ["admin", "teacher"],
        },
        {
          id: 6,
          icon: <HouseOutlined fontSize="small" />,
          title: "Classes",
          href: "/list/classes",
          visible: ["admin", "teacher"],
        },
        {
          id: 7,
          icon: <LocalLibraryOutlined fontSize="small" />,
          title: "Detail Classes",
          href: "/list/detail-classes",
          visible: ["admin", "teacher"],
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
          title: "Results",
          href: "/list/results",
          visible: ["admin", "teacher", "parent", "student"],
        },
        {
          id: 11,
          icon: <Diversity3Outlined fontSize="small" />,
          title: "Attendance",
          href: "/list/attendance",
          visible: ["admin", "teacher", "parent", "student"],
        },
        {
          id: 12,
          icon: <CalendarMonthOutlined fontSize="small" />,
          title: "Events",
          href: "/list/events",
          visible: ["admin", "teacher", "parent", "student"],
        },
        // {
        //   id: 13,
        //   icon: <ReviewsOutlined fontSize="small" />,
        //   title: "Messages",
        //   href: "/list/messages",
        //   visible: ["admin", "teacher", "parent", "student"],
        // },
        {
          id: 14,
          icon: <CampaignOutlined fontSize="small" />,
          title: "Announcements",
          href: "/list/announcements",
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
                  if (item.visible.includes(role))
                    return (
                      <Link key={item.id} to={item.href}>
                        <div className="flex gap-2 items-center p-2 text-[gray] font-normal cursor-pointer hover:bg-webSkyLight">
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
