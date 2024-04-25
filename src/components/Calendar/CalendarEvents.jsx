import SchedulePreview from "../Schedule/SchedulePreview";

import { useAccountEventStore } from "../../store/account";
import { useSelectedEventStore } from "../../store/schedules";
import { useCalendarSelectionStore } from "../../store/navbar";

import { isSameDay } from "../../utils/handleCalendar";
import { sortEvents, getAllEvents } from "../../utils/handleCalendarEvents";

import {
  CALENDAR_BORDER_COLORS,
  CALENDAR_COLORS_STRONG,
  CALENDAR_COLORS_LIGHT,
} from "../../constant/calendar";

function CalendarEvents(date, schedulePreviewRef) {
  const currentDate = date.date;
  const { accounts } = useAccountEventStore();
  const { selectedCalendars } = useCalendarSelectionStore();
  const { selectedEvent, setSelectedEvent } = useSelectedEventStore;
  const allEvents = getAllEvents(accounts);
  const sortedEvents = sortEvents(allEvents);
  const renderedSections = [];
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

  function handleEventClick(event) {
    setSelectedEvent(event);
  }

  function handleEventClose(event) {
    event.stopPropagation();

    setSelectedEvent(null);
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

export default CalendarEvents;
