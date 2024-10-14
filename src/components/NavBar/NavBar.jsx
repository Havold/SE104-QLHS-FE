// import "./navBar.scss";
import Search from "../Search/Search";
import { ReviewsOutlined, CampaignOutlined } from "@mui/icons-material";

const NavBar = () => {
  const avatar ='https://i.pinimg.com/564x/97/bb/06/97bb067e30ff6b89f4fbb7b9141025ca.jpg'
  return (
    <div className="flex items-center justify-between p-2 sticky top-0 bg-white z-50">
        <Search />
      <div className="flex items-center gap-12 w-full justify-end ">
          <ReviewsOutlined fontSize="small" className="cursor-pointer text-[gray]" />
          <div className="relative cursor-pointer">
            <CampaignOutlined fontSize="small" className="text-[gray] " />
            <div className="w-4 h-4 flex items-center justify-center absolute top-0 -right-2 bg-[#7d38f3] text-[white] rounded-full text-[10px]"><span>1</span></div>
          </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="flex flex-col items-end">
            <h3 className="text-[12px]">John Doe</h3>
            <div className="text-[10px] text-[gray]">Admin</div>
          </div>
            <img className="w-[40px] h-[40px] rounded-full" src={avatar} alt="profilePic" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
