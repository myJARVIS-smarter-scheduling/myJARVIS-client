export const convertTimeWithTimezone = (
  dateString: string,
  eventTimezone: string,
) => {
  const eventDate = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
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

export const formatDateWithoutYear = (date: Date) => {
  const datePart = date.toDateString().split(" ");

  return `${datePart[1]} ${datePart[2]}`;
};
