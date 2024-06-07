import { ViewOption } from "../types/selectBox";

export const CREATE_VIEW_OPTIONS: ViewOption[] = [
  { label: "Event", value: "calendar" },
];

export const CALENDAR_VIEW: ViewOption[] = [
  { label: "Monthly", value: "Monthly" },
  { label: "Weekly", value: "Weekly" },
];

export const CALENDAR_VIEW_OPTIONS: ViewOption[] = [
  { label: "all-in-one", value: "all-in-one" },
  { label: "multiple", value: "multiple" },
];

export const SCHEDULE_HEADER_OPTIONS: ViewOption[] = [
  { label: "Duplicate", value: "Duplicate" },
  { label: "Copy", value: "Copy" },
  { label: "Delete", value: "Delete" },
];
