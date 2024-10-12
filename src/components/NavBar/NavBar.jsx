import "./navBar.scss";
import Search from "../Search/Search";
import { ReviewsOutlined, CampaignOutlined } from "@mui/icons-material";

const NavBar = () => {
  const avatar ='https://i.pinimg.com/564x/97/bb/06/97bb067e30ff6b89f4fbb7b9141025ca.jpg'
  return (
    <div className="navBar">
      <div className="left">
        <Search />
      </div>
      <div className="right">
          <ReviewsOutlined className="icon" />
          <div className="notification">
            <CampaignOutlined className="icon" />
            <div className="popNumber">1</div>
          </div>
        <div className="user">
          <div className="left">
            <h3>John Doe</h3>
            <span>Admin</span>
          </div>
          <div className="right">
            <img src={avatar} alt="profilePic" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
