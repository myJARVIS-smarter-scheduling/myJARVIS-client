import { IoLocationOutline } from "react-icons/io5";
import { PiUsersThree } from "react-icons/pi";

import { formatDateWithoutYear } from "../../utils/convertDateFormat";

import { CALENDAR_BORDER_COLORS } from "../../constant/calendar";

function ConflictSchedule({ conflictEvents, accountIndex }) {
  const hasAttendees = conflictEvents.attendees.length !== 0;
  const hasLocation = conflictEvents.place !== "";

  const startDate = new Date(conflictEvents.startAt);
  const endDate = new Date(conflictEvents.endAt);

  const { title } = conflictEvents;
  const convertedStartDate = formatDateWithoutYear(startDate);
  const convertedEndDate = formatDateWithoutYear(endDate);
  const startTime = startDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const endTime = endDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const attendees = hasAttendees
    ? conflictEvents.attendees.join(", ")
    : "No attendees Information";
  const location = hasLocation
    ? conflictEvents.place
    : "No location Information";

  return (
    <section className="w-full my-10 border shadow-md min-h-70 border-slate-200 sm:overflow-y-auto">
      <div
        className={`flex flex-col items-start justify-center w-full h-full px-10 py-5 space-y-2 border-l-8 ${CALENDAR_BORDER_COLORS[accountIndex]}`}
      >
        <div className="font-semibold text-15">
          <p>{title}</p>
        </div>
        <div className="flex items-center font-light text-13 text-slate-400 overflow-clip">
          <p>
            {startTime} - {endTime}
          </p>
        </div>
        <div className="flex items-center font-light text-13 text-slate-400 overflow-clip">
          <p>
            {convertedStartDate} - {convertedEndDate}
          </p>
        </div>
        <div>
          <div className="flex items-center justify-start space-x-5 text-13">
            <IoLocationOutline size="1em" />
            <p className="text-slate-700">{location}</p>
          </div>
          <div className="flex items-center justify-start space-x-5 text-13">
            <PiUsersThree size="1em" />
            <p className="text-slate-700">{attendees}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConflictSchedule;
