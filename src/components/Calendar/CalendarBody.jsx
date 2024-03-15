import { useState, useRef, useEffect } from "react";

import useCurrentMonthStore from "../../store/dates";
import { useAccountEventStore } from "../../store/account";

import SchedulePreview from "../Schedule/SchedulePreview";

import {
  CALENDAR_DAYS,
  MINI_CALENDAR_DAYS,
  CALENDAR_BORDER_COLORS,
  CALENDAR_COLORS_STRONG,
  CALENDAR_COLORS_LIGHT,
} from "../../constant/calendar";

function CalendarBody({ isMiniCalendar = false }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const schedulePreviewRef = useRef();

  const { accounts } = useAccountEventStore();
  const { currentMonth } = useCurrentMonthStore();

  const CALENDAR_DAYS_LABEL = isMiniCalendar
    ? MINI_CALENDAR_DAYS
    : CALENDAR_DAYS;

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        schedulePreviewRef.current &&
        !schedulePreviewRef.current.contains(event.target)
      ) {
        setSelectedEvent(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function isSameDay(eventDate, comparedDate) {
    return (
      eventDate.getFullYear() === comparedDate.getFullYear() &&
      eventDate.getMonth() === comparedDate.getMonth() &&
      eventDate.getDate() === comparedDate.getDate()
    );
  }

  function handleEventClick(event) {
    setSelectedEvent(event);
  }

  function handleEventClose(event) {
    event.stopPropagation();

    setSelectedEvent(null);
  }

  const handleKeyDown = (event, callback) => {
    if (event.key === "Enter" || event.key === " ") {
      callback();
    }
  };

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
            key={`${day}`}
            style={{ width: "14.2857%" }}
            className="flex-grow p-2 overflow-hidden text-center border-b-1 text-15 max-w-250:text-20"
          >
            {day}
          </div>
        ))}
      </div>
    );
  }

  function renderEventsForDate(date, accountList) {
    const allEvents = accountList.flatMap((account, accountIndex) =>
      account.events.map((event) => ({
        ...event,
        accountIndex,
        startAt: new Date(event.startAt),
        endAt: new Date(event.endAt),
      })),
    );

    const sortedEvents = allEvents.sort((a, b) => {
      const dateOfA = new Date(a.startAt);
      const dateOfB = new Date(b.startAt);

      const dateStringA = `${dateOfA.getFullYear()}/${dateOfA.getMonth() + 1}/${dateOfA.getDate()}`;
      const dateStringB = `${dateOfB.getFullYear()}/${dateOfB.getMonth() + 1}/${dateOfB.getDate()}`;

      if (dateStringA < dateStringB) return -1;
      if (dateStringA > dateStringB) return 1;

      return a.accountIndex - b.accountIndex;
    });

    const isEventOverlapping = (event, dayStart, dayEnd) => {
      return event.startAt <= dayEnd && event.endAt >= dayStart;
    };

    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59,
      999,
    );

    const previousDateStart = new Date(startOfDay);
    previousDateStart.setDate(startOfDay.getDate() - 1);
    const previousDateEnd = new Date(endOfDay);
    previousDateEnd.setDate(endOfDay.getDate() - 1);

    const previousDayEventCount = allEvents.filter((event) =>
      isEventOverlapping(event, previousDateStart, previousDateEnd),
    ).length;

    const currentDayEventCount = allEvents.filter((event) =>
      isEventOverlapping(event, startOfDay, endOfDay),
    ).length;

    const diffCount = Math.max(0, previousDayEventCount - currentDayEventCount);
    const renderedSections = [];

    for (let i = 0; i < diffCount; i += 1) {
      renderedSections.push(
        <section
          key={`empty-${i}`}
          className="flex items-center justify-start h-20 mt-5"
        ></section>,
      );
    }

    sortedEvents
      .map((event) => {
        const eventStartDate = new Date(event.startAt);
        const eventEndDate = new Date(event.endAt);
        const duration = eventStartDate.getDate() - eventEndDate.getDate();
        const isContinuousEvent =
          date >= eventStartDate && date <= eventEndDate;
        const isSameDayWithEvent = isSameDay(eventStartDate, date);
        const isSelectedEvent =
          selectedEvent && selectedEvent._id === event._id;

        const accountBorderColor = CALENDAR_BORDER_COLORS[event.accountIndex];
        const accountColorLight = CALENDAR_COLORS_LIGHT[event.accountIndex];
        const accountColorStrong = CALENDAR_COLORS_STRONG[event.accountIndex];

        if (isContinuousEvent || (!isContinuousEvent && isSameDayWithEvent)) {
          renderedSections.push(
            <section key={event._id}>
              <div
                onClick={() => handleEventClick(event)}
                onKeyDown={(ev) =>
                  handleKeyDown(ev, () => handleEventClick(event))
                }
                role="button"
                tabIndex="0"
                className={`flex items-center h-20 justify-start cursor-pointer ${duration && accountColorLight} mt-5`}
              >
                {isSameDayWithEvent && (
                  <div
                    className={`relative w-full h-20 border-l-4 ${accountBorderColor} px-5 overflow-hidden text-clip shrink cursor-pointer`}
                  >
                    <p className="w-full h-20 text-left text-slate-900">
                      {event.title}
                    </p>
                  </div>
                )}
              </div>
              {isSelectedEvent && isSameDayWithEvent && (
                <div ref={schedulePreviewRef} className="absolute z-20">
                  <SchedulePreview
                    accountColor={accountColorStrong}
                    eventInfo={selectedEvent}
                    handleCloseButtonClick={handleEventClose}
                  />
                </div>
              )}
            </section>,
          );
        }

        return null;
      })
      .filter(Boolean);

    return renderedSections;
  }

  function renderWeek(week) {
    return (
      <div className="flex flex-1">
        {week.map((date) => {
          const dateKey = date.toISOString();
          const isToday = date.toDateString() === new Date().toDateString();
          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
          const textColorOfCurrentMonth = isCurrentMonth
            ? "text-slate-800"
            : "text-gray-400";

          return (
            <div
              key={dateKey}
              className={`${!isMiniCalendar && "border border-slate-50"} overflow-hidden py-3 text-13 min-w-250:text-20 w-full flex flex-col justify-start items-center`}
              style={{ width: "14.2857%" }} // 100% / 7
            >
              <div
                className={`w-20 h-20 text-center cursor-pointer ${textColorOfCurrentMonth} ${isToday && "bg-blue-600 rounded-full text-white"}`}
              >
                {date.getDate()}
              </div>
              <div className="w-full">
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
          <div key={weekKey} className="relative flex flex-1 divide-x">
            {renderWeek(week)}
          </div>
        );
      })}
    </div>
  );
}

export default CalendarBody;
