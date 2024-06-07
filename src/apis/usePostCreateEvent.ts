import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useLoginProviderStore } from "../store/account";

import { EventForm } from "../types/events";
import API from "../config/api";
import TIMEZONE_LIST from "../constant/timezone";

const createEvent = async (eventInfo: EventForm) => {
  const navigate = useNavigate();
  const { accountInfo, user } = useLoginProviderStore();
  const {
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
  } = eventInfo;
  const convertedNewStartDate = eventInfo.startDate.toLocaleDateString();
  const convertedNewEndDate = eventInfo.endDate.toLocaleDateString();
  const formattedStartDate = `${convertedNewStartDate} ${startTime}`;
  const formattedEndDate = `${convertedNewEndDate} ${endTime}`;
  const accountIdForNewEvent = accountId;
  const account = accountInfo.find(
    (account) => account.accountId === accountIdForNewEvent,
  );

  if (!account) {
    console.error("Account not found for the provided accountId");
    return;
  }

  const accountEmailForNewEvent = account.email;
  const isMicrosoftAccount = accountEmailForNewEvent.includes("outlook");

  let startAt;
  let endAt;
  let formattedTimezone;

  if (isAllDay) {
    startAt = startDate.toLocaleDateString();
    endAt = endDate;

    endAt.setDate(endAt.getDate() + 1);

    endAt = endAt.toLocaleDateString();
  } else {
    startAt = formattedStartDate;
    endAt = formattedEndDate;
  }

  if (isMicrosoftAccount) {
    const foundAltValue = TIMEZONE_LIST.find(
      (option) => option.value === timezone,
    );

    formattedTimezone = foundAltValue ? foundAltValue.alt : user?.timezone;
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
    isAllDay,
    description,
  };

  const response = await axios.post(
    API.EVENTS,
    { newEventData },
    { withCredentials: true },
  );

  if (response.data.result === "success") {
    const { newEvent } = response.data;

    console.log("Created Event:", newEvent);

    navigate("/calendar");
  }
};

export default createEvent;
