// import "./navBar.scss";
import { useContext } from "react";
import Search from "../Search/Search";
import { ReviewsOutlined, CampaignOutlined } from "@mui/icons-material";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="flex items-center justify-between p-2 sticky top-0 bg-white custom-box-shadow z-2">
      {/* <Search /> */}
      <div className="flex items-center gap-12 w-full justify-end ">
        <ReviewsOutlined
          fontSize="small"
          className="cursor-pointer text-[gray]"
        />
        <div className="relative cursor-pointer">
          <CampaignOutlined fontSize="small" className="text-[gray] " />
          <div className="w-4 h-4 flex items-center justify-center absolute top-0 -right-2 bg-[#7d38f3] text-[white] rounded-full text-[10px]">
            <span>1</span>
          </div>
        </div>
        <Link to={`list/students/${currentUser.id}`}>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex flex-col items-end">
              <h3 className="text-[12px]">{currentUser.fullName}</h3>
              <div className="text-[10px] text-[gray]">
                {currentUser.role.name}
              </div>
            </div>
            <img
              className="w-[40px] h-[40px] rounded-full object-cover"
              src={
                currentUser.img
                  ? `${process.env.REACT_APP_API_URL}${currentUser.img}`
                  : "../../assets/noAvatar.jpg"
              }
              alt="profilePic"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
