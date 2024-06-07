import { useRef, useEffect } from "react";
import SchedulePreview from "../Schedule/SchedulePreview";

import { useAccountEventStore } from "../../store/account";
import { useSelectedEventStore } from "../../store/schedules";
import { useCalendarSelectionStore } from "../../store/navbar";

import { isSameDay } from "../../utils/handleCalendarEvents";
import { sortEvents, getAllEvents } from "../../utils/handleCalendarEvents";
import { CalendarEvent } from "src/types/events";

import {
  CALENDAR_BORDER_COLORS,
  CALENDAR_COLORS_STRONG,
  CALENDAR_COLORS_LIGHT,
} from "../../constant/calendar";

interface CalendarEventsProps {
  date: Date;
}

function CalendarEvents({ date }: CalendarEventsProps) {
  const schedulePreviewRef = useRef<HTMLDivElement>(null);
  const currentDate = date;

  const { accounts } = useAccountEventStore();
  const { selectedCalendars } = useCalendarSelectionStore();
  const { selectedEvent, setSelectedEvent, clearSelectedEvent } =
    useSelectedEventStore();
  const allEvents = getAllEvents(accounts);
  const sortedEvents = sortEvents(allEvents);
  const renderedSections: JSX.Element[] = []; // 노션에 정리
  const startOfDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  );
  const endOfDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + 1,
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        schedulePreviewRef.current &&
        !schedulePreviewRef.current.contains(event.target as Node)
      ) {
        clearSelectedEvent();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleEventClick(event: CalendarEvent) {
    setSelectedEvent(event);
  }

  sortedEvents
    .map((event) => {
      const accountBorderColor = CALENDAR_BORDER_COLORS[event.accountIndex];
      const accountColorLight = CALENDAR_COLORS_LIGHT[event.accountIndex];
      const accountColorStrong = CALENDAR_COLORS_STRONG[event.accountIndex];

      const eventStartDate = new Date(event.startAt);
      const eventEndDate = new Date(event.endAt);
      const isAllDayEvent = event.isAllDay;
      const isMultiDayEvent = event.isMultiDay;
      const isToday = isSameDay(eventStartDate, currentDate);
      const isEventInCurrentDay =
        new Date(eventStartDate) < endOfDay &&
        new Date(eventEndDate) > startOfDay;
      const isStartDayMatch = isSameDay(eventStartDate, currentDate);
      const isSelectedEvent = selectedEvent && selectedEvent._id === event._id;
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
                  eventInfo={selectedEvent}
                  accountColor={accountColorStrong}
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

export default CalendarEvents;
