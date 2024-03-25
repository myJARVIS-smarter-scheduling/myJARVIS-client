/* eslint-disable no-nested-ternary */
import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";

import { FaRegCalendarCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { HiBars3BottomLeft, HiMapPin } from "react-icons/hi2";

import {
  useLoginProviderStore,
  useBiWeeklyEventListStore,
} from "../../store/account";
import { useNavbarStore } from "../../store/navbar";
import { convertTimeWithTimezone } from "../../utils/convertDateFormat";

import Header from "../../shared/Header";
import DropdownMenu from "../../shared/DropdownMenu";
import TimePicker from "../../shared/CustomTimePicker";
import TextEditor from "../../shared/TextEditor";
import CustomDatePicker from "../../shared/CustomDatePicker";
import DropDownTextMenu from "../../shared/DropdownTextMenu";
import RightSideBar from "../RightSideBar/RightSideBar";
import RightSideBarItems from "../RightSideBar/RightSideBarItems";
import ConflictAlert from "../LeftSideBar/ConfilctAlert";

import API from "../../config/api";
import TIMEZONE_LIST from "../../constant/timezone";

const placeholder = "More actions";
const headerOptions = [
  { label: "Duplicate", value: "Duplicate" },
  { label: "Copy", value: "Copy" },
  { label: "Delete", value: "Delete" },
];

function isAllDayEventBasedOnDuration(startDateInfo, endDateInfo) {
  const start = new Date(startDateInfo);
  const end = new Date(endDateInfo);
  const diff = end - start;

  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  return diff === oneDayInMilliseconds;
}

function ScheduleDetails({ isNewEvent = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, accountInfo } = useLoginProviderStore();
  const { biWeeklyEvents } = useBiWeeklyEventListStore();
  const { isRightSidebarOpen } = useNavbarStore();

  const initialEventState = location.state.event || {};
  const theDateOfClick = location.state.dateOfEvent;
  const hasEventTimezone = user.timezone !== initialEventState.timezone;
  const isAllDayEvent = isAllDayEventBasedOnDuration(
    initialEventState.startAt,
    initialEventState.endAt,
  );

  let convertedStartDate;
  let convertedEndDate;
  let convertedStartTime;
  let convertedEndTime;

  if (hasEventTimezone && !isNewEvent) {
    const convertedStart = convertTimeWithTimezone(
      initialEventState.startAt,
      initialEventState.timezone,
    );
    const convertedEnd = convertTimeWithTimezone(
      initialEventState.endAt,
      initialEventState.timezone,
    );

    convertedStartDate = convertedStart.split(",")[0].trim();
    convertedEndDate = convertedEnd.split(",")[0].trim();
    convertedStartTime = convertedStart.split(",")[1].trim();
    convertedEndTime = convertedEnd.split(",")[1].trim();
  }

  const accountList = accountInfo.map((account) => {
    const accountOptions = {};
    accountOptions.label = account.email;
    accountOptions.value = account.accountId;

    return accountOptions;
  });
  const labeledTimezone = TIMEZONE_LIST.filter((option) => {
    return (
      option.value === initialEventState.timezone ||
      option.alt === user.timezone ||
      option.value === user.timezone
    );
  });

  let eventStartDate = initialEventState.startAt;
  let eventEndDate = initialEventState.endAt;
  let eventStartTime = "10:00 AM";
  let eventEndTime = "11:00 AM";

  if (isNewEvent) {
    eventStartDate = theDateOfClick;
    eventEndDate = theDateOfClick;
    eventStartTime = "10:00 AM";
    eventEndTime = "11:00 AM";
  } else {
    if (isAllDayEvent) {
      eventStartDate = initialEventState.startAt;
      eventEndDate = initialEventState.startAt;
      eventStartTime = "12:00 AM";
      eventEndTime = "11:59 PM";
    }

    if (!isAllDayEvent && hasEventTimezone) {
      eventStartDate = convertedStartDate;
      eventEndDate = convertedEndDate;
      eventStartTime = convertedStartTime;
      eventEndTime = convertedEndTime;
    }
  }

  const [accountId, setAccountId] = useState(accountList[0].value);
  const [eventEmail, setEventEmail] = useState(initialEventState.email);
  const [isAllDay, setIsAllDay] = useState(isAllDayEvent);
  const [title, setTitle] = useState(isNewEvent ? "" : initialEventState.title);
  const [place, setPlace] = useState(isNewEvent ? "" : initialEventState.place);
  const [description, setDescription] = useState(
    initialEventState.description || "",
  );
  const [startDate, setStartDate] = useState(eventStartDate);
  const [endDate, setEndDate] = useState(eventEndDate);
  const [timezone, setTimezone] = useState(
    labeledTimezone.length === 1 && labeledTimezone[0].value
      ? labeledTimezone[0].value
      : initialEventState.timezone,
  );
  const [startTime, setStartTime] = useState(
    hasEventTimezone ? eventStartTime : initialEventState.startAt,
  );
  const [endTime, setEndTime] = useState(
    hasEventTimezone ? eventEndTime : initialEventState.endAt,
  );
  const [conflicts, setConflicts] = useState([]);
  const [hasConflictAlert, sethasConflictAlert] = useState(false);

  function handleAllDayEventChange(ev) {
    setIsAllDay(ev.target.checked);
  }

  function isAllDayEventOfBiweekly(event) {
    const start = new Date(event.startAt);
    const end = new Date(event.endAt);

    return (
      end - start === 86400000 &&
      start.getHours() === 0 &&
      start.getMinutes() === 0
    );
  }

  async function createEvent() {
    const convertedNewStartDate = startDate.toLocaleDateString();
    const convertedNewEndDate = endDate.toLocaleDateString();
    const formattedStartDate = `${convertedNewStartDate} ${startTime}`;
    const formattedEndDate = `${convertedNewEndDate} ${endTime}`;
    const { provider } = initialEventState;

    let startAt;
    let endAt;
    let formattedTimezone;

    if (isAllDayEvent) {
      startAt = startDate.toLocaleDateString();
      endAt = endDate;
      endAt.setDate(endAt.getDate() + 1);
      endAt = endAt.toLocaleDateString();
    } else {
      startAt = formattedStartDate;
      endAt = formattedEndDate;
    }

    if (provider === "microsoft") {
      const foundAltValue = TIMEZONE_LIST.find(
        (option) => option.value === timezone,
      );

      formattedTimezone = foundAltValue ? foundAltValue.alt : user.timezone;
    } else {
      formattedTimezone = timezone;
    }

    const newEventData = {
      accountId,
      title,
      place,
      startAt,
      endAt,
      timezone: formattedTimezone,
      isAllDayEvent,
      description,
      provider,
    };

    const response = await axios.post(
      API.EVENTS,
      { newEventData },
      { withCredentials: true },
    );

    if (response.data.result === "success") {
      const { newEvent } = response.data;
      // addSingleBiWeeklyEvent(newEvent);
      console.log("셍성된 이벤트:", newEvent);

      navigate("/calendar");
    }
  }

  async function updateEventData() {
    const convertedUpdateStartDate = new Date(startDate).toLocaleDateString();
    const convertedUpdateEndDate = new Date(endDate).toLocaleDateString();
    const formattedStartDate = `${convertedUpdateStartDate} ${startTime}`;
    const formattedEndDate = `${convertedUpdateEndDate} ${endTime}`;
    const { provider } = initialEventState;

    const startAt = isAllDayEvent
      ? startDate.setHours(0, 0, 0, 0)
      : formattedStartDate;

    const endAt = isAllDayEvent
      ? endDate.setDate(endDate.getDate() + 1).setHours(0, 0, 0, 0)
      : formattedEndDate;

    const updatedEventData = {
      dataId: initialEventState._id,
      title,
      place,
      startAt,
      endAt,
      timezone,
      isAllDayEvent,
      description,
      provider,
    };

    const response = await axios.patch(
      `${API.EVENTS}/${initialEventState.eventId}`,
      { updatedEventData },
      { withCredentials: true },
    );

    if (response.data.result === "success") {
      const { updatedEvent } = response.data;
      console.log("업데이트된 이벤트:", updatedEvent);

      navigate("/calendar");
    }
  }

  function handleSaveWithConflict() {
    if (isNewEvent) {
      createEvent();
    } else {
      updateEventData();
    }
  }

  function handleSaveClick() {
    let startHours;
    let startMinutes;
    let endHours;
    let endMinutes;

    if (typeof startTime === "string" && typeof endTime === "string") {
      [startHours, startMinutes] = startTime.endsWith("AM")
        ? startTime.replace(" AM", "").split(":").map(Number)
        : startTime
            .replace(" PM", "")
            .split(":")
            .map((num) => (num === "12" ? 12 : Number(num) + 12));
      [endHours, endMinutes] = endTime.endsWith("AM")
        ? endTime.replace(" AM", "").split(":").map(Number)
        : endTime
            .replace(" PM", "")
            .split(":")
            .map((num) => (num === "12" ? 12 : Number(num) + 12));
    } else {
      startHours = startTime.getHours();
      startMinutes = startTime.getMinutes();
      endHours = endTime.getHours();
      endMinutes = endTime.getMinutes();
    }

    const newStart = new Date(startDate);
    newStart.setHours(startHours, startMinutes);

    const newEnd = new Date(endDate);
    newEnd.setHours(endHours, endMinutes);

    const conflictEvents = biWeeklyEvents.filter((event) => {
      const eventStart = new Date(event.startAt);
      const eventEnd = new Date(event.endAt);
      const eventIsAllDay = isAllDayEventOfBiweekly(event);

      if (eventIsAllDay) {
        return (
          newStart.toDateString() === eventStart.toDateString() ||
          newStart.toDateString() === eventEnd.toDateString()
        );
      }
      return (
        (newStart < eventEnd && newEnd > eventStart) ||
        (eventStart < newEnd && eventEnd > newStart)
      );
    });

    if (conflictEvents.length > 0) {
      setConflicts(conflictEvents);
      sethasConflictAlert(true);
    } else {
      handleSaveWithConflict();
    }
  }

  return (
    <main className="relative flex w-screen h-screen">
      <div className="flex flex-col items-center w-full h-full overflow-hidden">
        {hasConflictAlert && (
          <ConflictAlert
            handleConfirmEvent={handleSaveWithConflict}
            handleAlertPopUp={sethasConflictAlert}
            conflictList={conflicts}
          />
        )}
        <Header>
          <section className="flex items-center w-full h-full space-x-5 p-15">
            <div className="flex items-center w-full space-x-40">
              <nav className="flex items-center w-full h-full space-x-20">
                <button
                  aria-label="Close button"
                  className="flex items-center justify-center w-40 h-40 rounded-full hover:bg-slate-100"
                  onClick={() => navigate("/calendar")}
                >
                  <IoClose size={30} className="cursor-pointer" />
                </button>
                <input
                  className="w-full px-3 py-2 font-light text-gray-900 placeholder-gray-500 border-b-2 border-gray-300 text-30 focus:outline-none focus:ring-0 focus:border-blue-500"
                  name="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </nav>
              <nav className="flex items-center w-full space-x-20">
                <button
                  type="button"
                  className="h-40 text-white transition duration-300 ease-in-out transform bg-blue-600 rounded-md w-90 hover:bg-[rgba(0,0,0,0.6)]"
                  onClick={handleSaveClick}
                >
                  <p>Save</p>
                </button>
                <div className="text-1em w-170">
                  {/* TODO. 기본 기능 (추가/삭제/수정) 구현 후 바로 작업합니다. */}
                  <DropdownMenu
                    options={headerOptions}
                    placeholder={placeholder}
                  />
                </div>
              </nav>
            </div>
          </section>
        </Header>
        <div className="flex w-full h-full">
          <div className="w-full h-full">
            <aside className="flex flex-col items-start justify-center w-full py-20 px-60 space-y-15">
              <div className="flex items-center justify-start w-full space-x-20">
                <section className="flex items-center justify-center space-x-15">
                  <CustomDatePicker
                    initialTime={startDate}
                    handleDateClick={setStartDate}
                  />
                  {isAllDay ? null : (
                    <TimePicker
                      initialTime={startTime}
                      handleTimeClick={setStartTime}
                    />
                  )}
                </section>
                <div>
                  <p>to</p>
                </div>
                <section className="flex items-center justify-center space-x-15">
                  <CustomDatePicker
                    initialTime={endDate}
                    handleDateClick={setEndDate}
                  />
                  {isAllDay ? null : (
                    <TimePicker
                      initialTime={endTime}
                      handleTimeClick={setEndTime}
                    />
                  )}
                </section>
                {!isAllDay && (
                  <div className="flex items-center justify-center text-sm font-thin w-290">
                    <DropDownTextMenu
                      placeholder={timezone}
                      handleOptionChange={setTimezone}
                      options={TIMEZONE_LIST}
                    />
                  </div>
                )}
              </div>
              <p className="font-light text-15 text-slate-600">{timezone}</p>
              <div className="flex items-center justify-start space-x-10">
                <label
                  htmlFor="allDayEvent"
                  className="flex items-center space-x-10"
                >
                  <input
                    id="allDayEvent"
                    type="checkbox"
                    checked={isAllDay ? "checked" : ""}
                    className="w-17 h-17"
                    onChange={handleAllDayEventChange}
                  />
                  <p className="text-17 text-slate-800">All day event</p>
                </label>
              </div>
            </aside>
            <aside className="flex items-start justify-between w-full h-auto px-20 space-x-30">
              <section
                id="eventDetails"
                className="flex flex-col items-center w-full h-full bg-white min-w-600"
              >
                <nav className="w-full py-20 pl-40 font-normal text-left text-20">
                  <div className="w-full font-normal text-left text-25">
                    Event Details
                  </div>
                  <hr />
                </nav>
                <aside className="flex flex-col w-full h-full space-y-30">
                  <div className="flex items-center justify-start w-full space-x-25">
                    <FaRegCalendarCheck size={22} />
                    {isNewEvent ? (
                      <div className="min-w-210 text-15">
                        <DropdownMenu
                          options={accountList}
                          placeholder={user.email}
                          handleOptionChange={setAccountId}
                        />
                      </div>
                    ) : (
                      <p>{isNewEvent ? user.email : initialEventState.email}</p>
                    )}
                  </div>
                  <div className="flex items-center justify-start space-x-25">
                    <HiMapPin size={22} />
                    <input
                      className="w-full h-40 px-3 py-2 font-light text-gray-900 placeholder-gray-500 border-b-2 border-gray-300 text-1em focus:outline-none focus:ring-0 focus:border-blue-500"
                      value={place}
                      name="place"
                      onChange={(event) => setPlace(event.target.value)}
                    />
                  </div>
                  <div className="flex items-start justify-start w-full mt-10 space-x-25">
                    <HiBars3BottomLeft size={22} />
                    <div className="w-full">
                      <TextEditor
                        initialText={description}
                        handleDescriptionChange={setDescription}
                      />
                    </div>
                  </div>
                </aside>
              </section>
              <section className="w-full h-full">
                <nav className="w-full py-20 font-normal text-left text-20">
                  <div className="w-full font-normal text-left text-25">
                    Guests
                  </div>
                  <hr />
                </nav>
                <div className="w-full h-full space-y-20 font-light text-slate-700">
                  {!isNewEvent &&
                    initialEventState.attendees.map((attendee) => {
                      return (
                        <div
                          key={attendee}
                          className="flex items-center justify-start w-full text-17 space-x-25"
                        >
                          <p>{attendee}</p>
                        </div>
                      );
                    })}
                </div>
              </section>
            </aside>
          </div>
          <div className="flex h-full">
            <RightSideBar />
          </div>
        </div>
      </div>
      {isRightSidebarOpen && <RightSideBarItems />}
    </main>
  );
}

export default ScheduleDetails;
