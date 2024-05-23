import { isAllDayEventBasedOnDuration } from "./handleCalendar";
import { Account } from "../types/account";
import { CalendarEvent, Schedule, EventData } from "../types/events";

export const sortEvents = (allEvents: CalendarEvent[]) =>
  allEvents.sort((a: CalendarEvent, b: CalendarEvent) => {
    const startAtA = new Date(a.startAt).getTime();
    const startAtB = new Date(b.startAt).getTime();

    if (a.isMultiDay && b.isMultiDay) {
      const startDiff = startAtA - startAtB;

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

    return startAtA - startAtB;
  });

export const getAllEvents = (accountList: Account[]) => {
  const allEvents: CalendarEvent[] = accountList.flatMap(
    (account, accountIndex) =>
      account.events.map((eventInfo: EventData) => {
        // 명시적으로 unknown으로 변환한 후 EventData 타입으로 캐스팅, 질문하기
        // const eventInfo: EventData = event as unknown as EventData;
        const startAt = new Date(eventInfo.startAt);
        const endAt = new Date(eventInfo.endAt);

        const schedule: CalendarEvent = {
          ...eventInfo,
          email: account.email,
          accountIndex,
          startAt,
          endAt,
          duration: endAt.getTime() - startAt.getTime(),
          isMultiDay: endAt.getTime() - startAt.getTime() > 24 * 60 * 60 * 1000,
          isAllDay: isAllDayEventBasedOnDuration(startAt, endAt),
        };

        return schedule;
      }),
  );

  return allEvents;
};

export const getConflictEventsOfDate = (conflictEvents: Schedule[]) => {
  const conflictDates = new Set();

  conflictEvents.forEach(({ events }) => {
    const startDates = events.map((event) => new Date(event.startAt).getTime());
    const endDates = events.map((event) => new Date(event.endAt).getTime());

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
