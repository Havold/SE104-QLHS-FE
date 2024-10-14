import { MoreHorizRounded } from "@mui/icons-material";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const events = [
  {
    id: 1,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

function EventCalendar() {
  const [value, setValue] = useState(new Date());
  return (
    <div className="bg-white p-4 rounded-2xl">
      <Calendar onChange={setValue} value={value} />
      <div className="flex items-center justify-between">
        <h3 className="text-[18px] font-semibold my-2">Events</h3>
        <MoreHorizRounded className="cursor-pointer"/>
      </div>
      <div className="flex flex-col gap-2">
        {events.map((event) => (
          <div key={event.id} className="flex flex-col p-4 gap-2 border border-gray-100 rounded-md border-t-4 odd:border-t-webSky even:border-t-webPurple">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-gray-600">{event.title}</h3>
              <span className="text-[10px] text-gray-300">{event.time}</span>
            </div>
            <p className="text-[12px] text-gray-400">{event.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventCalendar;
