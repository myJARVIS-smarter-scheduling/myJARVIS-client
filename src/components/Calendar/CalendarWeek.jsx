import { useNavigate } from "react-router-dom";

import CalendarEvents from "./CalendarEvents";

import useCurrentMonthStore from "../../store/TypeScript/dates.ts";
import { useConflictEventStore } from "../../store/TypeScript/schedules.ts";

import { getConflictEventsOfDate } from "../../utils/handleCalendarEvents.ts";

function CalendarWeek({
  week,
  handleEventDateChange,
  cellBorderClass,
  conflictClass,
  isMiniCalendar,
}) {
  const navigate = useNavigate();
  const { currentMonth } = useCurrentMonthStore();
  const { conflictEvents } = useConflictEventStore();
  const overlappingDates = getConflictEventsOfDate(conflictEvents);

  function handleNewEventDoubleClick(dateOfEvent) {
    navigate("/events/new", { state: { dateOfEvent } });
  }

  return (
    <div className="flex flex-1">
      {week.map((date) => {
        const dateKey = date.toISOString();
        const isToday = date.toDateString() === new Date().toDateString();
        const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
        const isConflictDate = overlappingDates.has(date.toDateString());
        const textColorOfCurrentMonth = isCurrentMonth
          ? "text-slate-800"
          : "text-gray-400";

        return (
          <div
            key={dateKey}
            onDoubleClick={() => handleNewEventDoubleClick(date)}
            className={`${cellBorderClass} overflow-hidden py-3 text-13 min-w-250:text-20 w-full flex flex-col justify-start items-center`}
            style={{ width: "14.2857%" }}
            data-testid={`date-${date.getFullYear()}-${date.getMonth()}-${date.getDate() + 1}`}
          >
            <button
              className={`w-20 h-20 relative rounded-full text-center cursor-pointer ${textColorOfCurrentMonth} ${isToday && "bg-blue-600 text-white"} ${isConflictDate && conflictClass}`}
              onClick={() => handleEventDateChange(date)}
            >
              {date.getDate()}
            </button>
            <div className="w-full">
              {!isMiniCalendar && <CalendarEvents date={date} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CalendarWeek;
