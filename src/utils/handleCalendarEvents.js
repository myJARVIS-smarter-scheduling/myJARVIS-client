import { isAllDayEventBasedOnDuration } from "./handleCalendar";

export const sortEvents = (allEvents) =>
  allEvents.sort((a, b) => {
    if (a.isMultiDay && b.isMultiDay) {
      const startDiff = a.startAt - b.startAt;

      if (startDiff !== 0) return startDiff;

      return b.duration - a.duration;
    }
    if (a.isMultiDay) {
      return -1;
    }
    if (b.isMultiDay) {
      return 1;
    }

    if (a.isAllDay && !b.isAllDay) {
      return -1;
    }
    if (!a.isAllDay && b.isAllDay) {
      return 1;
    }

    return a.startAt - b.startAt;
  });

export const getAllEvents = (accountList) => {
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

  return allEvents;
};

export const getConflictEventsOfDate = (conflictEvents) => {
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
};
