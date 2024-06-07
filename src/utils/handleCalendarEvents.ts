import { Account, AccountInfo } from "../types/account";
import { CalendarEvent, Schedule, EventData } from "../types/events";

export const sortEvents = (allEvents: CalendarEvent[]): CalendarEvent[] =>
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

export const sortConflicts = (
  conflictList: EventData[],
  accountInfo: AccountInfo[],
): EventData[] => {
  return conflictList.sort((a, b) => {
    const dateOfA = new Date(a.startAt);
    const dateOfB = new Date(b.startAt);

    const dateStringA = `${dateOfA.getFullYear()}/${dateOfA.getMonth() + 1}/${dateOfA.getDate()}`;
    const dateStringB = `${dateOfB.getFullYear()}/${dateOfB.getMonth() + 1}/${dateOfB.getDate()}`;

    if (dateStringA < dateStringB) return -1;
    if (dateStringA > dateStringB) return 1;

    const indexOfA = accountInfo.findIndex(
      (account) => account.accountId === a.accountId,
    );
    const indexOfB = accountInfo.findIndex(
      (account) => account.accountId === b.accountId,
    );

    return indexOfA - indexOfB;
  });
};

export const findConflicts = (accounts: Account[]): Schedule[] => {
  const allEvents = accounts.flatMap((account) =>
    account.events.map((event) => ({
      ...event,
      accountId: account.accountId,
    })),
  );

  const conflicts: Schedule[] = [];

  for (let i = 0; i < allEvents.length; i += 1) {
    for (let j = i + 1; j < allEvents.length; j += 1) {
      const eventA = allEvents[i];
      const eventB = allEvents[j];

      if (
        new Date(eventA.startAt) <= new Date(eventB.endAt) &&
        new Date(eventB.startAt) <= new Date(eventA.endAt)
      ) {
        const conflictExists = conflicts.some((conflict) =>
          conflict.events.find(
            (event) =>
              (event._id === eventA._id || event._id === eventB._id) &&
              ((event.startAt === eventA.startAt &&
                event.endAt === eventA.endAt) ||
                (event.startAt === eventB.startAt &&
                  event.endAt === eventB.endAt)),
          ),
        );

        if (!conflictExists) {
          conflicts.push({
            accounts: [eventA.accountId, eventB.accountId].filter(
              (value, index, self) => self.indexOf(value) === index,
            ),
            events: [eventA, eventB],
          });
        }
      }
    }
  }

  return conflicts;
};

export const getAllEvents = (accountList: Account[]) => {
  const allEvents: CalendarEvent[] = accountList.flatMap(
    (account, accountIndex) =>
      account.events.map((eventInfo: EventData) => {
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

export const isAllDayEventOfBiweekly = (
  event: CalendarEvent | EventData,
): boolean => {
  const start = new Date(event.startAt);
  const end = new Date(event.endAt);

  return (
    end.getTime() - start.getTime() === 86400000 &&
    start.getHours() === 0 &&
    start.getMinutes() === 0
  );
};

export const isAllDayEventBasedOnDuration = (
  startDate?: Date | string,
  endDate?: Date | string,
): boolean => {
  const start = new Date(startDate ?? "");
  const end = new Date(endDate ?? "");

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return false;
  }

  const diff = end.getTime() - start.getTime();
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  return diff === oneDayInMilliseconds;
};

export const isSameDay = (eventDate: Date, comparedDate: Date): boolean => {
  return (
    eventDate.getFullYear() === comparedDate.getFullYear() &&
    eventDate.getMonth() === comparedDate.getMonth() &&
    eventDate.getDate() === comparedDate.getDate()
  );
};
