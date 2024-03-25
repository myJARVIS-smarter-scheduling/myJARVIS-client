import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FiTrash2 } from "react-icons/fi";
import { IoClose, IoArchiveSharp } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
import { HiMiniUsers, HiMapPin } from "react-icons/hi2";
import {
  useLoginProviderStore,
  useAccountEventStore,
} from "../../store/account";

import { CALENDAR_DAYS } from "../../constant/calendar";
import API from "../../config/api";

function SchedulePreview({ eventInfo, handleCloseButtonClick, accountColor }) {
  if (!eventInfo) {
    return null;
  }

  const navigate = useNavigate();
  const { deleteEvent } = useAccountEventStore();
  const { provider } = useLoginProviderStore();
  const { title, attendees } = eventInfo;
  const eventStartDate = new Date(eventInfo.startAt);
  const eventEndDate = new Date(eventInfo.endAt);
  const eventDay = CALENDAR_DAYS[eventStartDate.getDay()];

  function setIsAllDayEventBasedOnDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = end - start;

    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    return diff === oneDayInMilliseconds;
  }

  const isAllDayEvent = setIsAllDayEventBasedOnDuration(
    eventStartDate,
    eventEndDate,
  );
  const location = eventInfo.place;
  const attendeesCount = eventInfo.attendees.length;

  const formattedStartDate = eventStartDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });
  const formattedStartTime = eventStartDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedEndTime = eventEndDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  function handleEditButtonClick(event) {
    navigate(`/events/${event.eventId}/editing`, {
      state: { event: { ...event, isAllDayEvent } },
    });
  }

  async function handleDeleteButtonClick(event) {
    const accountData = {
      accountId: event.accountId,
      provider,
    };

    const response = await axios.delete(`${API.EVENTS}/${event._id}`, {
      data: accountData,
      withCredentials: true,
    });

    if (response.data.result === "success") {
      deleteEvent(event.accountId, event._id);
      handleCloseButtonClick();
    }
  }

  return (
    <div className="z-30 bg-white shadow-2xl py-13 rounded-xl w-500 min-h-250">
      <aside className="flex items-center w-full px-15">
        <nav className="flex items-center justify-end w-full space-x-40">
          <div className="flex items-center justify-between w-120">
            <button
              id="upadte"
              type="button"
              onClick={() => handleEditButtonClick(eventInfo)}
              aria-label="Edit event"
              className="flex items-center justify-center hover:bg-slate-100 hover:rounded-full w-30 h-30"
            >
              <LuPencil size={20} className="cursor-pointer" />
            </button>
            <button
              id="delete"
              type="button"
              onClick={() => handleDeleteButtonClick(eventInfo)}
              aria-label="Delete event"
              className="flex items-center justify-center hover:bg-slate-100 hover:rounded-full w-30 h-30"
            >
              <FiTrash2
                size={20}
                className="cursor-pointer hover:bg-slate-100 hover:rounded-full"
              />
            </button>
            <button
              id="save"
              aria-label="Archive event"
              className="flex items-center justify-center hover:bg-slate-200 hover:rounded-full w-30 h-30"
            >
              <IoArchiveSharp
                size={20}
                className="cursor-pointer hover:bg-slate-100 hover:rounded-full"
              />
            </button>
          </div>
          <button
            type="button"
            aria-label="close Button"
            onClick={(event) => handleCloseButtonClick(event)}
            className="flex items-center justify-center rounded-full hover:bg-slate-700 hover:text-white bg-slate-100 w-30 h-30"
          >
            <IoClose size={22} className="cursor-pointer" />
          </button>
        </nav>
      </aside>
      <main className="space-y-20 px-30">
        <section>
          <div className="flex items-center py-10 space-x-25">
            <div className={`${accountColor} rounded-md w-18 h-18`}></div>
            <p className="font-light text-25">{title}</p>
          </div>
          <div className="flex space-x-10 text-sm font-light pl-45 text-slate-800 ">
            <p className="space-y-5">
              <span>{eventDay}</span>
              <span>&#44;</span>
              <span>{formattedStartDate}</span>
            </p>
            {!isAllDayEvent ? (
              <>
                <span>&#183;</span>
                <p className="flex items-center space-x-5">
                  <p>
                    <span>{formattedStartTime}</span>
                  </p>
                  <span>&#45;</span>
                  <p>
                    <span>{formattedEndTime}</span>
                  </p>
                </p>
              </>
            ) : null}
          </div>
        </section>
        <section className="flex items-center h-full space-x-25 w-150">
          <HiMapPin size={20} className="text-slate-800" />
          <p className="text-slate-700">{location}</p>
        </section>
        <section className="flex flex-col justify-center h-full">
          <div className="flex space-x-25">
            <HiMiniUsers size={20} className="text-slate-800" />
            <p className="text-slate-700">{attendeesCount}명</p>
          </div>
          <div className="flex flex-col py-10 space-y-10 font-light pl-45 text-15 text-slate-700">
            {attendees.map((attendee) => {
              return <span key={attendee}>{attendee}</span>;
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default SchedulePreview;
