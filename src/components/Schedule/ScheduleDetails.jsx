/* eslint-disable no-nested-ternary */
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { FaRegCalendarCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { HiBars3BottomLeft, HiMapPin } from "react-icons/hi2";

import {
  useLoginProviderStore,
  useBiWeeklyEventListStore,
} from "../../store/account";
import useNavbarStore from "../../store/navbar";
import DropDownTextMenu from "../../shared/DropdownTextMenu";
import getTimezoneFormat from "../../utils/getTimezoneFormat";

import Header from "../../shared/Header";
import DropdownMenu from "../../shared/DropdownMenu";
import TimePicker from "../../shared/CustomTimePicker";
import TextEditor from "../../shared/TextEditor";
import CustomDatePicker from "../../shared/CustomDatePicker";
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

function ScheduleDetails({ isNewEvent = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, provider, accountInfo } = useLoginProviderStore();
  const { biWeeklyEvents } = useBiWeeklyEventListStore();
  const { isRightSidebarOpen } = useNavbarStore();

  const eventData = isNewEvent ? {} : location.state.event;
  const currentDate = location.state.dateOfEvent;
  const isToday =
    new Date().toDateString() === new Date(currentDate).toDateString();

  const accountList = accountInfo.map((account) => {
    const accountOptions = {};
    accountOptions.label = account.accountId;
    accountOptions.value = account.email;

    return accountOptions;
  });

  const [accountId, setAccountId] = useState(accountList[0].value);
  const [title, setTitle] = useState(isNewEvent ? "" : eventData.title);
  const [place, setPlace] = useState(isNewEvent ? "" : eventData.place);
  const [description, setDescription] = useState(eventData.description || "");
  const [isAllDayEvent, setIsAllDayEvent] = useState(!!isNewEvent);
  const [startDate, setStartDate] = useState(
    isNewEvent
      ? isToday
        ? new Date()
        : currentDate
      : new Date(eventData.startAt),
  );
  const [endDate, setEndDate] = useState(
    isNewEvent
      ? isToday
        ? new Date()
        : currentDate
      : new Date(eventData.endAt),
  );
  const timezonePlaceholder = getTimezoneFormat(startDate);
  const startTimePlaceholder = startDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const endTimePlaceholder = endDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const [timezone, setTimezone] = useState(timezonePlaceholder || "");
  const [startTime, setStartTime] = useState(startDate.toLocaleTimeString());
  const [endTime, setEndTime] = useState(endDate.toLocaleTimeString());
  const [conflicts, setConflicts] = useState([]);
  const [hasConflictAlert, sethasConflictAlert] = useState(false);

  function handleAllDayEventChange(ev) {
    setIsAllDayEvent(ev.target.checked);
  }

  async function updateEventData() {
    const convertedStartDate = new Date(startDate).toDateString();
    const convertedEndDate = new Date(endDate).toDateString();
    const formattedStartDate = new Date(`${convertedStartDate} ${startTime}`);
    const formattedEndDate = new Date(`${convertedEndDate} ${endTime}`);

    const startAt = isAllDayEvent
      ? new Date(startDate).setHours(0, 0, 0, 0)
      : formattedStartDate;

    const endAt = isAllDayEvent
      ? new Date(
          new Date(endDate).setDate(new Date(endDate).getDate() + 1),
        ).setHours(0, 0, 0, 0)
      : formattedEndDate;

    const updatedEventData = {
      dataId: eventData._id,
      title,
      place,
      startAt,
      endAt,
      timezone,
      isAllDayEvent,
      description,
      provider,
    };

    console.log("업데이트할 데이터:", updatedEventData);

    const response = await axios.patch(
      `${API.EVENTS}/${eventData.eventId}`,
      { updatedEventData },
      { withCredentials: true },
    );

    if (response.data.result === "success") {
      const { updatedEvent } = response.data;
      console.log("업데이트된 이벤트:", updatedEvent);

      navigate("/calendar");
    }
  }

  async function createEvent() {
    const convertedStartDate = new Date(startDate).toDateString();
    const convertedEndDate = new Date(endDate).toDateString();
    const formattedStartDate = new Date(`${convertedStartDate} ${startTime}`);
    const formattedEndDate = new Date(`${convertedEndDate} ${endTime}`);

    let startAt;
    let endAt;

    if (isAllDayEvent) {
      startAt = new Date(startDate).toDateString();
      endAt = new Date(endDate);
      endAt.setDate(endAt.getDate() + 1);
      endAt = endAt.toDateString();
    } else {
      startAt = formattedStartDate;
      endAt = formattedEndDate;
    }

    // TODO. startAt과 endAt을 ISO 문자열로 변환 (API 요구사항에 따라 필요한 경우)

    const newEventData = {
      accountId,
      title,
      place,
      startAt,
      endAt,
      timezone,
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
      console.log("셍성된 이벤트:", newEvent);

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
    const potentialConflicts = biWeeklyEvents.filter((event) => {
      const eventStart = new Date(event.startAt).getTime();
      const eventEnd = new Date(event.endAt).getTime();
      const newStart = new Date(startDate).getTime();
      const newEnd = new Date(endDate).getTime();

      return newStart < eventEnd && newEnd > eventStart;
    });

    if (potentialConflicts.length > 0) {
      setConflicts(potentialConflicts);
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
            hadnleConfirmEvent={handleSaveWithConflict}
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
                  {isAllDayEvent ? null : (
                    <TimePicker
                      initialTime={startTimePlaceholder}
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
                  {isAllDayEvent ? null : (
                    <TimePicker
                      initialTime={endTimePlaceholder}
                      handleTimeClick={setEndTime}
                    />
                  )}
                </section>
                <div className="flex items-center justify-center text-sm font-thin w-290">
                  <DropDownTextMenu
                    placeholder={timezonePlaceholder}
                    handleOptionChange={setTimezone}
                    options={TIMEZONE_LIST}
                  />
                </div>
              </div>
              <p className="font-light text-15 text-slate-600">{timezone}</p>
              <div className="flex items-center justify-start space-x-10">
                <label htmlFor="allDayEvent">
                  <p className="text-17 text-slate-800">All day event</p>
                  <input
                    id="allDayEvent"
                    type="checkbox"
                    checked={isAllDayEvent ? "checked" : ""}
                    className="w-17 h-17"
                    onChange={handleAllDayEventChange}
                  />
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
                      <div className="w-230 text-15">
                        <DropdownMenu
                          options={accountList}
                          placeholder={user}
                          handleOptionChange={setAccountId}
                        />
                      </div>
                    ) : (
                      <p>{user}</p>
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
                    {/* TODO. 텍스트 에디터를 사용합니다. */}
                    {/* 텍스트 에디터로 저장된 내용을 웹훅 전달시 어떻게 전달하는지 확인이 필요합니다. */}
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
                    eventData.attendees.map((attendee) => {
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
