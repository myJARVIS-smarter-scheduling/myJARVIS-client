import { EventData } from "./events";

export interface User {
  email: string;
  provider: "microsoft" | "google";
  timezone: string;
}

export interface AccountInfo {
  accessToken: string;
  accountId: string;
  email: string;
  provider: string;
}

export interface Account {
  accessToken: string;
  accountId: string;
  email: string;
  events: EventData[];
  provider: string;
}
