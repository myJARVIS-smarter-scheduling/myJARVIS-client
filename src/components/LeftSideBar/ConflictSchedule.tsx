import { useNavigate } from "react-router-dom";

import { HiPencilSquare } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";
import { PiUsersThree } from "react-icons/pi";

import { useLoginProviderStore } from "../../store/account";

import { isAllDayEventBasedOnDuration } from "../../utils/handleCalendarEvents";
import { formatDateWithoutYear } from "../../utils/convertDateFormat";
import { EventData } from "src/types/events";
import { CALENDAR_BORDER_COLORS } from "../../constant/calendar";

interface ConflictScheduleProps {
  conflictEvents: EventData;
  accountIndex: number;
}

function ConflictSchedule({
  conflictEvents,
  accountIndex,
}: ConflictScheduleProps) {
  const navigate = useNavigate();
  const { accountInfo } = useLoginProviderStore();
  const { title } = conflictEvents;
  const hasAttendees = conflictEvents.attendees.length !== 0;
  const hasLocation = conflictEvents.place !== "";
  const startDate = new Date(conflictEvents.startAt);
  const endDate = new Date(conflictEvents.endAt);
  const convertedStartDate = formatDateWithoutYear(startDate);
  const convertedEndDate = formatDateWithoutYear(endDate);
  const isAllDayEvent = isAllDayEventBasedOnDuration(startDate, endDate);
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
  const eventAccount = accountInfo.find(
    (account) => account.accountId === conflictEvents.accountId,
  );

  function handleOnClick() {
    const eventId = conflictEvents._id;

    if (!eventAccount) return;

    navigate(`/events/confilcts/${eventId}/editing`, {
      state: {
        event: { ...conflictEvents, email: eventAccount.email, isAllDayEvent },
      },
    });
  }

  return (
    <section className="w-full my-10 border shadow-md min-h-70 border-slate-200 sm:overflow-y-auto">
      <div
        className={`flex flex-col items-start justify-center w-full h-full px-10 py-5 space-y-2 border-l-8 ${CALENDAR_BORDER_COLORS[accountIndex]}`}
      >
        <div className="flex justify-between w-full pr-5 font-semibold text-15">
          <p>{title}</p>
          <button
            aria-label="Edit Event"
            type="button"
            onClick={handleOnClick}
            className="flex items-center justify-center w-20 h-20"
          >
            <HiPencilSquare size="1em" className="hover:text-teal-300" />
          </button>
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
