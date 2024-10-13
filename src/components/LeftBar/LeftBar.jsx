import {
  AccountCircleOutlined,
  AssignmentOutlined,
  CalendarMonthOutlined,
  CampaignOutlined,
  Diversity3Outlined,
  EscalatorWarningOutlined,
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

const LeftBar = ({className}) => {
  const menus = [
    {
      title: "MENU",
      items: [
        {
          id: 1,
          icon: <HomeOutlined fontSize="small"/>,
          title: "Home",
          href: "/",
        },
        {
          id: 2,
          icon: <SchoolOutlined fontSize="small"/>,
          title: "Teachers",
          href: "/teachers",
        },
        {
          id: 3,
          icon: <PeopleAltOutlined fontSize="small"/>,
          title: "Students",
          href: "/students",
        },
        {
          id: 4,
          icon: <EscalatorWarningOutlined fontSize="small"/>,
          title: "Parents",
          href: "/parents",
        },
        {
          id: 5,
          icon: <HouseOutlined fontSize="small"/>,
          title: "Classes",
          href: "/classes",
        },
        {
          id: 6,
          icon: <LocalLibraryOutlined fontSize="small"/>,
          title: "Lessons",
          href: "/lessons",
        },
        {
          id: 7,
          icon: <HomeWorkOutlined fontSize="small"/>,
          title: "Exams",
          href: "/exams",
        },
        {
          id: 8,
          icon: <AssignmentOutlined fontSize="small"/>,
          title: "Assignments",
          href: "/assignments",
        },
        {
          id: 9,
          icon: <Diversity3Outlined fontSize="small"/>,
          title: "Attendance",
          href: "/attendance",
        },
        {
          id: 10,
          icon: <CalendarMonthOutlined fontSize="small"/>,
          title: "Events",
          href: "/events",
        },
        {
          id: 11,
          icon: <ReviewsOutlined fontSize="small"/>,
          title: "Messages",
          href: "/messages",
        },
        {
          id: 12,
          icon: <CampaignOutlined fontSize="small"/>,
          title: "Announcement",
          href: "/announcement",
        },
      ],
    },
    {
      title: "OTHER",
      items: [
        {
          id: 1,
          icon: <AccountCircleOutlined fontSize="small"/>,
          title: "Profile",
          href: "/profile",
        },
        {
          id: 2,
          icon: <SettingsSuggestOutlined fontSize="small"/>,
          title: "Settings",
          href: "/settings",
        },
        {
          id: 3,
          icon: <LogoutRounded className="text-xl"/>,
          title: "Logout",
          href: "/logout",
        },
      ],
    },
  ];
  return (
    <div className={className +' overflow-auto hover:custom-scrollbar-hover '}>
      <div className="flex items-center justify-center p-1">
        <h1 className="text-2xl font-medium cursor-pointer text-center ">METAN</h1>
      </div>
      <div className="flex flex-col gap-[10px]">
        {menus.map((menu, index) => {
          return (<div key={index} className="flex flex-col gap-[10px]">
            <h3 className="font-extralight text-[gray] text-base">{menu.title}</h3>
            <div className="flex flex-col gap-2">
              {menu.items.map(item => <div className="flex gap-2 items-center p-2 text-[gray] font-normal cursor-pointer hover:bg-webSkyLight">
                {item.icon}
                <span className="hidden lg:block text-[12px]">{item.title}</span>
              </div>)}
            </div>
          </div>)
        })}
      </div>
    </div>
  );
};

export default LeftBar;
