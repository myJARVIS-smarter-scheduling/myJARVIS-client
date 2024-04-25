import { useMemo } from "react";
import { CALENDAR_DAYS, MINI_CALENDAR_DAYS } from "../constant/calendar";

function useCalendarSettings(isMiniCalendar) {
  return useMemo(
    () => ({
      dayLabels: isMiniCalendar ? MINI_CALENDAR_DAYS : CALENDAR_DAYS,
      cellBorderClass: isMiniCalendar ? "" : "border border-slate-50",
      conflictClass: isMiniCalendar
        ? "text-white border bg-[rgba(255,18,18,0.9)]"
        : "",
    }),
    [isMiniCalendar],
  );
}

export default useCalendarSettings;
