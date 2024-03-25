import { useNavigate } from "react-router-dom";

import { HiPencilSquare } from "react-icons/hi2";

import { formatDateWithoutYear } from "../../utils/convertDateFormat";

function ConflictAlertContent({ conflictEvent, handleAlertPopUp }) {
  const { title } = conflictEvent;
  const startDate = new Date(conflictEvent.startAt);
  const endDate = new Date(conflictEvent.endAt);
  const formattedStartDate = formatDateWithoutYear(startDate);
  const formattedEndDate = formatDateWithoutYear(endDate);
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

  return (
    <div className="flex items-center justify-between w-full font-light bg-red-100 border-l-8 border-red-600 p-15 text-13 overflow-clip">
      <div>
        <div>
          <p className="text-lg font-semibold">{title}</p>
        </div>
        <div className="flex space-x-10">
          <p>
            {formattedStartDate} - {formattedEndDate}
          </p>
          <p>
            {startTime} - {endTime}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ConflictAlertContent;
