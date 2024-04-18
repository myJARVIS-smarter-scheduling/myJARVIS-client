const SERVER_URL = import.meta.env.VITE_SERVER_HOST;

const API = {
  LOGIN_STATUS: `${SERVER_URL}`,
  AUTH: {
    GOOGLE: `${SERVER_URL}/auth/google`,
    OUTLOOK: `${SERVER_URL}/auth/outlook`,
    OUTLOOK_PROXY: `${SERVER_URL}/auth/outlook/proxy`,
    ASANA: `${SERVER_URL}/auth/asana`,
    LOGOUT: `${SERVER_URL}/auth/logout`,
  },
  CALENDAR: {
    GOOGLE: `${SERVER_URL}/calendar/google`,
    OUTLOOK: `${SERVER_URL}/calendar/outlook`,
    EVENTS: `${SERVER_URL}/calendar/events`,
  },
  EVENTS: `${SERVER_URL}/events`,
  TASKS: {
    ASANA: `${SERVER_URL}/tasks`,
  },
};

export default API;
