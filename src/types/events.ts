export interface EventForm {
  title: string;
  place: string;
  description: string;
  startDate: Date;
  endDate: Date;
  startTime?: string | Date;
  endTime?: string | Date;
  timezone?: string;
  isAllDay: boolean;
  accountId?: string;
}

export interface EventData {
  accountId: string;
  attendees: string[];
  description: string;
  startAt: string | Date;
  endAt: string | Date;
  etag: string;
  eventId: string;
  place: string;
  provider: string;
  timezone: string;
  title: string;
  __v: number;
  _id: string;
}

export interface Schedule {
  accounts: string[];
  events: EventData[];
}

export interface CalendarEvent extends EventData {
  accountIndex: number;
  duration: number;
  email: string;
  isAllDay: boolean;
  isMultiDay: boolean;
}
