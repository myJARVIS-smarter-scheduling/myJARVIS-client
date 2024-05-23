import { EventData } from "./events";

export interface UserInfo {
  "@odata.context": string;
  userPrincipalName: string;
  id: string;
  displayName: string;
  surname: string;
  givenName: string;
  preferredLanguage: string;
  mail: string;
  mobilePhone: string | null;
  jobTitle: string | null;
  officeLocation: string | null;
  businessPhones: string[];
}

export interface MailboxSettings {
  "@odata.context": string;
  archiveFolder: string;
  timeZone: string;
  delegateMeetingMessageDeliveryOptions: string;
  dateFormat: string;
  timeFormat: string;
  userPurpose: string;
  automaticRepliesSetting: {
    status: string;
    externalAudience: string;
    internalReplyMessage: string;
    externalReplyMessage: string;
    scheduledStartDateTime: {
      dateTime: string;
      timeZone: string;
    };
    scheduledEndDateTime: {
      dateTime: string;
      timeZone: string;
    };
  };
  language: {
    locale: string;
    displayName: string;
  };
  workingHours: {
    daysOfWeek: string[];
    startTime: string;
    endTime: string;
    timeZone: {
      name: string;
    };
  };
}

export interface MicrosoftEvent {
  "@odata.etag": string;
  id: string;
  createdDateTime: string;
  lastModifiedDateTime: string;
  changeKey: string;
  categories: string[];
  transactionId: string;
  originalStartTimeZone: string;
  originalEndTimeZone: string;
  iCalUId: string;
  uid: string;
  reminderMinutesBeforeStart: number;
  isReminderOn: boolean;
  hasAttachments: boolean;
  subject: string;
  bodyPreview: string;
  importance: string;
  sensitivity: string;
  isAllDay: boolean;
  isCancelled: boolean;
  isOrganizer: boolean;
  responseRequested: boolean;
  seriesMasterId: string | null;
  showAs: string;
  type: string;
  webLink: string;
  onlineMeetingUrl: string | null;
  isOnlineMeeting: boolean;
  onlineMeetingProvider: string;
  allowNewTimeProposals: boolean;
  occurrenceId: string | null;
  isDraft: boolean;
  hideAttendees: boolean;
  responseStatus: {
    response: string;
    time: string;
  };
  body: {
    contentType: string;
    content: string;
  };
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  location: {
    displayName: string;
    locationType: string;
    uniqueId: string;
    uniqueIdType: string;
  };
  locations: {
    displayName: string;
    locationType: string;
    uniqueId: string;
    uniqueIdType: string;
  }[];
  recurrence: string | null;
  attendees: string[];
  organizer: {
    emailAddress: {
      name: string;
      address: string;
    };
  };
  onlineMeeting: string | null;
  "calendar@odata.associationLink": string;
  "calendar@odata.navigationLink": string;
}

export interface AccountData {
  userInfo: UserInfo;
  mailboxSettings: MailboxSettings;
  calendarEvents: {
    "@odata.context": string;
    value: MicrosoftEvent[];
  };
  accessToken: string;
}

export interface AccountEventData {
  accountId: string;
  accessToken: string;
  email: string;
  provider: string;
  events: EventData[];
}
