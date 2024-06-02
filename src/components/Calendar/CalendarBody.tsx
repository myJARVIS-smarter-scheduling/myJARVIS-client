/* eslint-disable */
import useCalendarSettings from "../../hooks/useCalendarSettings.tsx";

import CalendarDay from "./CalendarDay";
import CalendarWeek from "./CalendarWeek";

import useCurrentMonthStore from "../../store/TypeScript/dates";

import {
  getCalendarDates,
  buildCalendarWeeks,
} from "../../utils/handleCalendar";

interface CalendarBodyProps {
  isMiniCalendar?: boolean;
  handleEventDateChange?: (date: Date) => void;
}

function CalendarBody({
  isMiniCalendar = false,
  handleEventDateChange,
}: CalendarBodyProps) {
  const { currentMonth } = useCurrentMonthStore();
  const { dayLabels, cellBorderClass, conflictClass } =
    useCalendarSettings(isMiniCalendar);

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
