/* eslint-disable */
import { useRef, useEffect } from "react";

import useCalendarSettings from "../../hooks/useCalendarSettings";

import CalendarDay from "./CalendarDay";
import CalendarWeek from "./CalendarWeek";

import { useSelectedEventStore } from "../../store/schedules";
import useCurrentMonthStore from "../../store/dates";

import {
  getCalendarDates,
  buildCalendarWeeks,
} from "../../utils/handleCalendar";

function CalendarBody({ isMiniCalendar = false, handleEventDateChange }) {
  console.log("isMiniCalendar Body", isMiniCalendar);
  const { clearSelectedEvent } = useSelectedEventStore();
  const { currentMonth } = useCurrentMonthStore();
  const schedulePreviewRef = useRef();
  const { dayLabels, cellBorderClass, conflictClass } =
    useCalendarSettings(isMiniCalendar);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        schedulePreviewRef.current &&
        !schedulePreviewRef.current.contains(event.target)
      ) {
        clearSelectedEvent();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const calendarDates = getCalendarDates(currentMonth);
  const calendarWeeks = buildCalendarWeeks(calendarDates);

  return (
    <div className="flex flex-col flex-grow w-full h-full">
      <div className="py-5">
        <CalendarDay dayLabels={dayLabels} />
      </div>
      {calendarWeeks.map((week) => {
        const firstDay = week[0].toISOString().slice(0, 10);
        const lastDay = week[week.length - 1].toISOString().slice(0, 10);
        const weekKey = `week-${firstDay}-to-${lastDay}`;

        return (
          <div key={weekKey} className="relative flex flex-1 divide-x">
            <CalendarWeek
              week={week}
              cellBorderClass={cellBorderClass}
              conflictClass={conflictClass}
              schedulePreviewRef={schedulePreviewRef}
              handleEventDateChange={handleEventDateChange}
              isMiniCalendar={isMiniCalendar}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CalendarBody;
