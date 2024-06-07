/* eslint-disable no-nested-ternary */
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { FaRegCalendarCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { HiBars3BottomLeft, HiMapPin } from "react-icons/hi2";
import { ViewOption } from "src/types/selectBox";

import Header from "../../shared/Header";
import DropdownMenu from "../../shared/DropdownMenu";
import TimePicker from "../../shared/CustomTimePicker";
import TextEditor from "../../shared/TextEditor";
import CustomDatePicker from "../../shared/CustomDatePicker";
import DropDownTextMenu from "../../shared/DropdownTextMenu";
import RightSideBar from "../RightSideBar/RightSideBar";
import RightSideBarItems from "../RightSideBar/RightSideBarItems";
import ConflictAlert from "../LeftSideBar/ConflictAlert";

import {
  useLoginProviderStore,
  useBiWeeklyEventListStore,
} from "../../store/account";
import { useNavbarStore } from "../../store/navbar";
import createEvent from "../../apis/usePostCreateEvent";
import updateEventData from "../../apis/usePostUpdateEvent";
import {
  isAllDayEventBasedOnDuration,
  isAllDayEventOfBiweekly,
} from "../../utils/handleCalendarEvents";
import { convertTimeWithTimezone } from "../../utils/convertDateFormat";

import TIMEZONE_LIST from "../../constant/timezone";
import { EventData } from "../../types/events";

function ScheduleDetails({ isNewEvent = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, accountInfo } = useLoginProviderStore();
  const { biWeeklyEvents } = useBiWeeklyEventListStore();
  const { isRightSidebarOpen } = useNavbarStore();

  const accountList = accountInfo.map((account) => {
    const accountOptions: ViewOption = { label: "", value: "" };

    accountOptions.label = account.email;
    accountOptions.value = account.accountId;

    return accountOptions;
  });

  const initialEventState = location.state.event || {};
  const theDateOfClick = location.state.dateOfEvent;
  const formattedEventTimezone = TIMEZONE_LIST.find(
    (option) =>
      option.value === initialEventState.timezone ||
      option.value === user?.timezone ||
      option.alt === user?.timezone,
  );
  const formattedUserTimezone = TIMEZONE_LIST.find(
    (option) =>
      option.value === user?.timezone || option.alt === user?.timezone,
  );
  const hasEventTimezone =
    formattedEventTimezone?.value !== formattedUserTimezone?.value;
  const isAllDayEvent = isAllDayEventBasedOnDuration(
    initialEventState.startAt,
    initialEventState.endAt,
  );

  let convertedStartDate;
  let convertedEndDate;
  let convertedStartTime;
  let convertedEndTime;
  let eventStartDate = initialEventState.startAt;
  let eventEndDate = initialEventState.endAt;
  let eventStartTime = initialEventState.startAt;
  let eventEndTime = initialEventState.endAt;

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
  const [isAllDay, setIsAllDay] = useState(isAllDayEvent);
  const [title, setTitle] = useState(isNewEvent ? "" : initialEventState.title);
  const [place, setPlace] = useState(isNewEvent ? "" : initialEventState.place);
  const [description, setDescription] = useState(
    initialEventState.description || "",
  );
  const [startDate, setStartDate] = useState(eventStartDate);
  const [endDate, setEndDate] = useState(eventEndDate);
  const [timezone, setTimezone] = useState(
    formattedEventTimezone?.value || user?.timezone || "",
  );
  const [startTime, setStartTime] = useState(eventStartTime);
  const [endTime, setEndTime] = useState(eventEndTime);
  const [conflicts, setConflicts] = useState<EventData[]>([]);
  const [hasConflictAlert, sethasConflictAlert] = useState(false);

  function handleAllDayEventChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setIsAllDay(ev.target.checked);
  }

  function handleSaveWithConflict() {
    const eventDataId = initialEventState._id;
    const eventInfo = {
      title,
      place,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      timezone,
      isAllDay,
      accountId,
    };

    if (isNewEvent) {
      createEvent(eventInfo);
    } else {
      updateEventData({ eventDataId, eventInfo });
    }
  }

  function handleSaveClick() {
    let startHours;
    let startMinutes;
    let endHours;
    let endMinutes;

    if (typeof startTime === "string") {
      [startHours, startMinutes] = startTime.endsWith("AM")
        ? startTime.replace(" AM", "").split(":").map(Number)
        : startTime
            .replace(" PM", "")
            .split(":")
            .map((num) => (num === "12" ? 12 : Number(num) + 12));
    } else {
      startHours = startTime.getHours();
      startMinutes = startTime.getMinutes();
    }

    if (typeof endTime === "string") {
      [endHours, endMinutes] = endTime.endsWith("AM")
        ? endTime.replace(" AM", "").split(":").map(Number)
        : endTime
            .replace(" PM", "")
            .split(":")
            .map((num) => (num === "12" ? 12 : Number(num) + 12));
    } else {
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
      const isAllDayEvent = isAllDayEventOfBiweekly(event);

      if (isAllDayEvent) {
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
                  aria-label="title"
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
                    placeholder="StartDate"
                    handleDateClick={setStartDate}
                  />
                  {isAllDay ? null : (
                    <TimePicker
                      labelForTest="startTime"
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
                    placeholder="EndDate"
                    handleDateClick={setEndDate}
                  />
                  {isAllDay ? null : (
                    <TimePicker
                      labelForTest="endTime"
                      initialTime={endTime}
                      handleTimeClick={setEndTime}
                    />
                  )}
                </section>
                {!isAllDay && (
                  <div className="flex items-center justify-center text-sm font-thin w-290">
                    <DropDownTextMenu
                      testIdName="timezoneInput"
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
                    checked={isAllDay ? true : false}
                    className="w-17 h-17"
                    onChange={(event) => handleAllDayEventChange(event)}
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
                          placeholder={user?.email}
                          handleOptionChange={setAccountId}
                        />
                      </div>
                    ) : (
                      <p>
                        {isNewEvent ? user?.email : initialEventState.email}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-start space-x-25">
                    <HiMapPin size={22} />
                    <input
                      className="w-full h-40 px-3 py-2 font-light text-gray-900 placeholder-gray-500 border-b-2 border-gray-300 text-1em focus:outline-none focus:ring-0 focus:border-blue-500"
                      value={place}
                      name="place"
                      aria-label="place"
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
                    initialEventState.attendees.map((attendee: string) => {
                      return (
                        <div
                          key={attendee}
                          data-testid="attendeeList"
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
