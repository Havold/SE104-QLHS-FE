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
import "./leftBar.scss";

const LeftBar = () => {
  const menus = [
    {
      title: "MENU",
      items: [
        {
          id: 1,
          icon: <HomeOutlined className="icon"/>,
          title: "Home",
          href: "/",
        },
        {
          id: 2,
          icon: <SchoolOutlined className="icon"/>,
          title: "Teachers",
          href: "/teachers",
        },
        {
          id: 3,
          icon: <PeopleAltOutlined className="icon"/>,
          title: "Students",
          href: "/students",
        },
        {
          id: 4,
          icon: <EscalatorWarningOutlined className="icon"/>,
          title: "Parents",
          href: "/parents",
        },
        {
          id: 5,
          icon: <HouseOutlined className="icon"/>,
          title: "Classes",
          href: "/classes",
        },
        {
          id: 6,
          icon: <LocalLibraryOutlined className="icon"/>,
          title: "Lessons",
          href: "/lessons",
        },
        {
          id: 7,
          icon: <HomeWorkOutlined className="icon"/>,
          title: "Exams",
          href: "/exams",
        },
        {
          id: 8,
          icon: <AssignmentOutlined className="icon"/>,
          title: "Assignments",
          href: "/assignments",
        },
        {
          id: 9,
          icon: <Diversity3Outlined className="icon"/>,
          title: "Attendance",
          href: "/attendance",
        },
        {
          id: 10,
          icon: <CalendarMonthOutlined className="icon"/>,
          title: "Events",
          href: "/events",
        },
        {
          id: 11,
          icon: <ReviewsOutlined className="icon"/>,
          title: "Messages",
          href: "/messages",
        },
        {
          id: 12,
          icon: <CampaignOutlined className="icon"/>,
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
          icon: <AccountCircleOutlined className="icon"/>,
          title: "Profile",
          href: "/profile",
        },
        {
          id: 2,
          icon: <SettingsSuggestOutlined className="icon"/>,
          title: "Settings",
          href: "/settings",
        },
        {
          id: 3,
          icon: <LogoutRounded className="icon"/>,
          title: "Logout",
          href: "/logout",
        },
      ],
    },
  ];
  return (
    <div className="leftBar">
      <div className="top">
        <h1>METAN</h1>
      </div>
      <div className="bottom">
        {menus.map((menu, index) => {
          return (<div className="menu">
            <h3>{menu.title}</h3>
            <div className="items">
              {menu.items.map(item => <div className="item">
                {item.icon}
                <span>{item.title}</span>
              </div>)}
            </div>
          </div>)
        })}
      </div>
    </div>
  );
};

export default LeftBar;
