import { MoreHorizRounded } from "@mui/icons-material";
import React from "react";

const UserCard = ({ type, date, total }) => {
  return (
    <div className="flex flex-1 items-center odd:bg-webPurple even:bg-webYellow rounded-2xl p-4 custom-box-shadow">
      <div className="flex flex-col justify-between w-full gap-2">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-green-600 bg-[white] w-fit py-1 px-2 rounded-full ">
            {date}
          </span>
          <MoreHorizRounded className="cursor-pointer"/>
        </div>
        <span className="text-2xl font-bold">{total}</span>
        <span className="capitalize text-[10px] text-[gray]">{type}</span>
      </div>
    </div>
  );
};

export default UserCard;
