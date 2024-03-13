import useCurrentMonthStore from "../../store/dates";
import { useAccountEventStore } from "../../store/account";

import {
  CALENDAR_DAYS,
  MINI_CALENDAR_DAYS,
  CALENDAR_COLORS,
  CALENDAR_COLORS_LIGHT,
} from "../../constant/calendar";

function CalendarBody({ isMiniCalendar = false }) {
  const { accounts } = useAccountEventStore();
  const { currentMonth } = useCurrentMonthStore();

  const CALENDAR_DAYS_LABEL = isMiniCalendar
    ? MINI_CALENDAR_DAYS
    : CALENDAR_DAYS;

  function getCalendarDates(thisMonth) {
    const dateList = [];

    const firstDateOfMonth = new Date(
      thisMonth.getFullYear(),
      thisMonth.getMonth(),
      1,
    );
    const lastDateOfMonth = new Date(
      thisMonth.getFullYear(),
      thisMonth.getMonth() + 1,
      0,
    );

    const daysBeforeStart = firstDateOfMonth.getDay();

    for (let i = daysBeforeStart; i > 0; i -= 1) {
      const date = new Date(firstDateOfMonth);

      date.setDate(date.getDate() - i);
      dateList.push(date);
    }

    for (let i = 1; i <= lastDateOfMonth.getDate(); i += 1) {
      const date = new Date(thisMonth.getFullYear(), thisMonth.getMonth(), i);

      dateList.push(date);
    }

    const nextMonthDaysAfterCurrentMonth = 7 - lastDateOfMonth.getDay();

    if (nextMonthDaysAfterCurrentMonth > 0) {
      for (let i = 1; i < nextMonthDaysAfterCurrentMonth; i += 1) {
        const date = new Date(lastDateOfMonth);

        date.setDate(date.getDate() + i);
        dateList.push(date);
      }
    }

    return dateList;
  }

  function buildWeek(dateList) {
    const weeks = [];
    let week = [];

    dateList.forEach((date, index) => {
      week.push(date);

      if ((index + 1) % 7 === 0) {
        weeks.push(week);
        week = [];
      }
    });

    if (week.length > 0) {
      weeks.push(week);
    }

    return weeks;
  }

  function renderWeekHeader() {
    return (
      <div className="flex">
        {CALENDAR_DAYS_LABEL.map((day, index) => (
          <div
            key={CALENDAR_DAYS_LABEL[index]}
            style={{ width: "14.2857%" }}
            className="flex-grow p-2 overflow-hidden text-center border-b-1 text-15 max-w-250:text-20"
          >
            {day}
          </div>
        ))}
      </div>
    );
  }

  function isSameDay(eventDate, comparedDate) {
    return (
      eventDate.getFullYear() === comparedDate.getFullYear() &&
      eventDate.getMonth() === comparedDate.getMonth() &&
      eventDate.getDate() === comparedDate.getDate()
    );
  }

  function renderEventsForDate(date, accountList) {
    return accountList.map((account, idx) => {
      const accountColor = CALENDAR_COLORS[idx];
      const accountColorLight = CALENDAR_COLORS_LIGHT[idx];

      return account.events
        .map((event) => {
          const eventStartDate = new Date(event.startAt);

          if (isSameDay(eventStartDate, date)) {
            return (
              <div
                key={event._id}
                className={`flex items-center h-20 justify-start ${accountColorLight} mt-5`}
              >
                <div
                  className={`w-full h-20 border-l-4 ${accountColor} px-5 overflow-hidden text-clip shirink`}
                >
                  <p className="h-20 text-left text-slate-900">{event.title}</p>
                </div>
              </div>
            );
          }

          return null;
        })
        .filter(Boolean);
    });
  }

  function renderWeek(week) {
    return (
      <div className="flex flex-1">
        {week.map((date) => {
          const dateKey = date.toISOString();
          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
          const textColorOfCurrentMonth = isCurrentMonth
            ? "text-slate-700"
            : "text-gray-400";

          return (
            <div
              key={dateKey}
              className={`${!isMiniCalendar && "border border-slate-50"} overflow-hidden text-13 min-w-250:text-20 `}
              style={{ width: "14.2857%" }} // 100% / 7
            >
              <div className={`text-center ${textColorOfCurrentMonth}`}>
                {date.getDate()}
              </div>
              <div className="px-3">
                {!isMiniCalendar && renderEventsForDate(date, accounts)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const calendarDates = getCalendarDates(currentMonth);
  const calendarWeeks = buildWeek(calendarDates);

  return (
    <div className="flex flex-col flex-grow w-full h-full">
      <div className="py-5">{renderWeekHeader()}</div>
      {calendarWeeks.map((week) => {
        const firstDay = week[0].toISOString().slice(0, 10);
        const lastDay = week[week.length - 1].toISOString().slice(0, 10);
        const weekKey = `week-${firstDay}-to-${lastDay}`;
        return (
          <div key={weekKey} className="flex flex-1 divide-x">
            {renderWeek(week)}
          </div>
        );
      })}
    </div>
  );
}

export default CalendarBody;
