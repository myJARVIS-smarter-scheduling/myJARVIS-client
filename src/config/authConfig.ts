import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_MICROSOFT_WEB_CLIENT_ID,
    authority: import.meta.env.VITE_MICROSOFT_AUTHORITY,
    redirectUri: "/calendar",
    postLogoutRedirectUri: "/",
    clientCapabilities: ["CP1"],
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (
        level: LogLevel,
        message: string,
        containsPii: boolean,
      ) => {
        if (containsPii) {
          return;
        }

        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;

          case LogLevel.Info:
            console.info(message);
            return;

          case LogLevel.Verbose:
            console.debug(message);
            return;

          case LogLevel.Warning:
            console.warn(message);
          // eslint-disable-next-line no-fallthrough
          default:
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: [
    "openid",
    "profile",
    "User.Read",
    "Calendars.ReadWrite",
    "MailboxSettings.Read",
  ],
};

export const tokenRequest = {
  scopes: [
    "openid",
    "profile",
    "User.Read",
    "Calendars.ReadWrite",
    "MailboxSettings.Read",
  ],
};

export const protectedResources = {
  graphMe: {
    endpoint: "https://graph.microsoft.com/v1.0/me",
    scopes: ["User.Read"],
  },
  graphMailSetting: {
    endpoint: "https://graph.microsoft.com/v1.0/me/mailboxSettings",
    scopes: ["MailboxSettings.Read"],
  },
  graphCalendarView: {
    endpoint: "https://graph.microsoft.com/v1.0/me/calendarview",
    scopes: ["Calendars.ReadWrite"],
  },
  graphCalendarEvents: {
    endpoint: "https://graph.microsoft.com/v1.0/me/events",
    scopes: ["Calendars.ReadWrite"],
  },
};
