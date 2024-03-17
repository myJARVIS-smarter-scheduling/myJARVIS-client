const SERVER_URL = import.meta.env.VITE_SERVER_HOST;

const API = {
  AUTH: {
    GOOGLE: `${SERVER_URL}/auth/google`,
    OUTLOOK: `${SERVER_URL}/auth/outlook`,
    OUTLOOK_PROXY: `${SERVER_URL}/auth/outlook/proxy`,
  },
  CALENDAR: {
    GOOGLE: `${SERVER_URL}/calendar/google`,
    OUTLOOK: `${SERVER_URL}/calendar/outlook`,
    EVENTS: `${SERVER_URL}/calendar/events`,
  },
  EVENTS: `${SERVER_URL}/events`,
};

export default API;
