import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { calendarEvents } from "../../lib/data";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState } from "react";
const localizer = momentLocalizer(moment)

const BigCalendar = () => {
    const [view, setView] = useState(Views.WORK_WEEK)
    
    const handleChangeView = (selectedView) => {
        setView(selectedView)
    }
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '98%'}}
        views={['work_week', 'day']}
        view={view}
        onView={handleChangeView}
        min={new Date(2024,1,0,8,0)}
        max={new Date(2024,1,0,17,0)}
      />
    </div>
  );
};

export default BigCalendar;
