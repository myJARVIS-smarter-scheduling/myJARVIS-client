/* eslint-disable */
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useCurrentMonthStore from "../../store/dates";
import { useAccountEventStore } from "../../store/account";
import { useCalendarSelectionStore } from "../../store/navbar";
import { useConflictEventStore } from "../../store/schedules";

import SchedulePreview from "../Schedule/SchedulePreview";

import { isAllDayEventBasedOnDuration } from "../../utils/convertDateFormat";
import {
  CALENDAR_DAYS,
  MINI_CALENDAR_DAYS,
  CALENDAR_BORDER_COLORS,
  CALENDAR_COLORS_STRONG,
  CALENDAR_COLORS_LIGHT,
} from "../../constant/calendar";

function CalendarBody({ isMiniCalendar = false, handleEventDateChange }) {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const schedulePreviewRef = useRef();
  const { accounts } = useAccountEventStore();
  const { conflictEvents } = useConflictEventStore();
  const { currentMonth } = useCurrentMonthStore();
  const { selectedCalendars } = useCalendarSelectionStore();

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

  function getConflictEventsDate(conflictEvents) {
    const conflictDates = new Set();

    conflictEvents.forEach(({ events }) => {
      const startDates = events.map((event) => new Date(event.startAt));
      const endDates = events.map((event) => new Date(event.endAt));

      const latestStartDate = new Date(Math.max(...startDates));
      const earliestEndDate = new Date(Math.min(...endDates));

      if (latestStartDate <= earliestEndDate) {
        for (
          let date = latestStartDate;
          date <= earliestEndDate;
          date.setDate(date.getDate() + 1)
        ) {
          conflictDates.add(date.toDateString());
        }
      }
    });

    return conflictDates;
  }

  function handleEventClick(event) {
    setSelectedEvent(event);
  }

  function handleEventClose(event) {
    event.stopPropagation();

    setSelectedEvent(null);
  }

  function handleNewEventDoubleClick(dateOfEvent) {
    navigate("/events/new", { state: { dateOfEvent } });
  }

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
            key={`${day}-${index}`}
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
        email: account.email,
        accountIndex,
        startAt: new Date(event.startAt),
        endAt: new Date(event.endAt),
        duration: new Date(event.endAt) - new Date(event.startAt),
        isMultiDay:
          new Date(event.endAt) - new Date(event.startAt) > 24 * 60 * 60 * 1000,
        isAllDay: isAllDayEventBasedOnDuration(event.startAt, event.endAt),
      })),
    );

    const sortedEvents = allEvents.sort((a, b) => {
      if (a.isMultiDay && b.isMultiDay) {
        const startDiff = a.startAt - b.startAt;

        if (startDiff !== 0) return startDiff;

        return b.duration - a.duration;
      } else if (a.isMultiDay) {
        return -1;
      } else if (b.isMultiDay) {
        return 1;
      }

      if (a.isAllDay && !b.isAllDay) {
        return -1;
      } else if (!a.isAllDay && b.isAllDay) {
        return 1;
      }

      return a.startAt - b.startAt;
    });

    const renderedSections = [];

    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1,
    );

    sortedEvents
      .map((event) => {
        const accountBorderColor = CALENDAR_BORDER_COLORS[event.accountIndex];
        const accountColorLight = CALENDAR_COLORS_LIGHT[event.accountIndex];
        const accountColorStrong = CALENDAR_COLORS_STRONG[event.accountIndex];

        const eventStartDate = new Date(event.startAt);
        const eventEndDate = new Date(event.endAt);
        const isAllDayEvent = event.isAllDay;
        const isMultiDayEvent = event.isMultiDay;
        const isToday = isSameDay(eventStartDate, date);
        const isEventInCurrentDay =
          new Date(eventStartDate) < endOfDay &&
          new Date(eventEndDate) > startOfDay;
        const isStartDayMatch = isSameDay(eventStartDate, date);

        const isSelectedEvent =
          selectedEvent && selectedEvent._id === event._id;
        const isUncheckedEvent = selectedCalendars.includes(event.email);

        if (
          isEventInCurrentDay &&
          !isUncheckedEvent &&
          (isAllDayEvent ? isStartDayMatch : true)
        ) {
          const colorClass =
            isAllDayEvent || isMultiDayEvent ? accountColorLight : "";
          const displayTitleAndBorder = isStartDayMatch ? "block" : "none";

          renderedSections.push(
            <section
              key={event._id}
              className={`flex items-center h-20 justify-start cursor-pointer ${colorClass} mt-5`}
            >
              <button
                type="button"
                onClick={() => handleEventClick(event)}
                className={`relative w-full h-20 ${displayTitleAndBorder === "block" ? `border-l-4 ${accountBorderColor}` : ""} px-5 overflow-hidden text-clip shrink cursor-pointer`}
              >
                {displayTitleAndBorder === "block" && (
                  <p className="w-full h-20 text-left text-slate-900">
                    {event.title}
                  </p>
                )}
              </button>
              {isSelectedEvent && isToday && (
                <div
                  ref={schedulePreviewRef}
                  className="absolute top-0 left-0 z-20 sm:top-1/2 sm:inset-x-auto"
                >
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
    const overlappingDates = getConflictEventsDate(conflictEvents);

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
              className={`${!isMiniCalendar && "border border-slate-50"} overflow-hidden py-3 text-13 min-w-250:text-20 w-full flex flex-col justify-start items-center`}
              style={{ width: "14.2857%" }}
              data-testid={`date-${date.getFullYear()}-${date.getMonth()}-${date.getDate() + 1}`}
            >
              <div
                className={`w-20 h-20 relative rounded-full text-center cursor-pointer ${textColorOfCurrentMonth} ${isToday && "bg-blue-600 text-white"} ${isConflictDate && isMiniCalendar && "text-white border bg-[rgba(255,18,18,0.9)]"}`}
                onClick={() => handleEventDateChange(date)}
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
