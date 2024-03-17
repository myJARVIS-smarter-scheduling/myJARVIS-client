function extractTimezone(date) {
  const dateString = date.toString();
  const timezone = dateString.match(/\(.*\)$/);

  return timezone ? timezone[0] : "";
}

function getTimezoneOffset(date) {
  const offset = -date.getTimezoneOffset();
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;

  return `(GMT${offset >= 0 ? "+" : "-"}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")})`;
}

function getTimezoneFormat(date) {
  return `${getTimezoneOffset(date)} ${extractTimezone(date)} `;
}

export default getTimezoneFormat;
