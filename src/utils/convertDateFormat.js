export const convertTimeWithTimezone = (dateString, eventTimezone) => {
  const eventDate = new Date(dateString);
  const options = {
    timeZone: eventTimezone,
    hour12: true,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    eventDate,
  );

  return formattedDate;
};

export const formatDateWithoutYear = (date) => {
  const datePart = date.toDateString().split(" ");

  return `${datePart[1]} ${datePart[2]}`;
};

export const isAllDayEventBasedOnDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diff = end - start;
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  return diff === oneDayInMilliseconds;
};
