import Announcements from "../../components/Announcements/Announcements";
import BigCalendar from "../../components/BigCalendar/BigCalendar";
import EventCalendar from "../../components/EventCalendar/EventCalendar";

const Teacher = () => {
  return (
    <div className="flex flex-col lg:flex-row p-2">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-2 bg-white p-4 rounded-2xl">
        <h3 className="text-[18px] font-semibold">Schedule (4A)</h3>
        <BigCalendar />
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-2 pl-2">
      <EventCalendar />
      <Announcements/>
      </div>
    </div>
  );
};

export default Teacher;
