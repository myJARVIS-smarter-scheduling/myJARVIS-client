import { useEffect } from "react";

import ConflictSchedule from "./ConflictSchedule";

import {
  useLoginProviderStore,
  useAccountEventStore,
  useBiWeeklyEventListStore,
} from "../../store/account";
import { useConflictEventStore } from "../../store/schedules";

import { findConflicts } from "../../utils/handleCalendarEvents";

function ConflictList() {
  const { accounts } = useAccountEventStore();
  const { accountInfo } = useLoginProviderStore();
  const { addConflict } = useConflictEventStore();
  const { addBiWeeklyEvents } = useBiWeeklyEventListStore();
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const lastDayOfBiweekly = new Date(
    now.setDate(firstDayOfWeek.getDate() + 13),
  );
  const lastDayOfWeek = new Date(now.setDate(firstDayOfWeek.getDate() + 6));
  lastDayOfWeek.setHours(23, 59, 59, 999);

  useEffect(() => {
    const conflictList = findConflicts(accounts);
    const biWeeklyEvents = accounts.flatMap((account) =>
      account.events.filter((event) => {
        const start = new Date(event.startAt);
        const end = new Date(event.endAt);

        return start < lastDayOfBiweekly && end >= firstDayOfWeek;
      }),
    );

    addConflict(conflictList);
    addBiWeeklyEvents(biWeeklyEvents);
  }, [accounts, addConflict, addBiWeeklyEvents]);

  const weeklyEvents = accounts.flatMap((account) =>
    account.events.filter((event) => {
      const start = new Date(event.startAt);
      const end = new Date(event.endAt);

      return start < lastDayOfWeek && end > firstDayOfWeek;
    }),
  );

  const Weeklyconflicts = [];

  for (let i = 0; i < weeklyEvents.length; i += 1) {
    for (let j = i + 1; j < weeklyEvents.length; j += 1) {
      if (
        new Date(weeklyEvents[i].startAt) < new Date(weeklyEvents[j].endAt) &&
        new Date(weeklyEvents[j].startAt) < new Date(weeklyEvents[i].endAt)
      ) {
        Weeklyconflicts.push(weeklyEvents[i], weeklyEvents[j]);
      }
    }
  }

  return (
    <main className="flex flex-col items-center justify-start w-full overflow-y-scroll">
      {Weeklyconflicts.map((conflictPair, index) => {
        const accountIndex = accountInfo.findIndex(
          (account) => account.accountId === conflictPair.accountId,
        );

        return (
          <>
            {index % 2 === 0 && (
              <div className="relative flex items-center w-full py-5">
                <div className="flex-grow border-t border-slate-400"></div>
                <span className="flex-shrink mx-10 text-slate-400">
                  Content
                </span>
                <div className="flex-grow border-t border-slate-400"></div>
              </div>
            )}
            <ConflictSchedule
              key={conflictPair.accountId}
              conflictEvents={conflictPair}
              accountIndex={accountIndex}
            />
          </>
        );
      })}
    </main>
  );
}

export default ConflictList;
