import { useNavigate } from "react-router-dom";
import axios from "axios";

import { EventForm } from "src/types/events";
import API from "../config/api";

interface updateEventDataProps {
  eventDataId: string;
  eventInfo: EventForm;
}

const updateEventData = async ({
  eventDataId,
  eventInfo,
}: updateEventDataProps) => {
  const navigate = useNavigate();
  const { place, description, startDate, endDate, timezone, isAllDay } =
    eventInfo;

  const convertedUpdateStartDate = new Date(startDate)
    .toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "");
  const convertedUpdateEndDate = new Date(endDate)
    .toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "");

  const startAt = isAllDay
    ? startDate.setHours(0, 0, 0, 0)
    : convertedUpdateStartDate;
  const endAt = isAllDay
    ? new Date(
        new Date(endDate).setDate(new Date(endDate).getDate() + 1),
      ).setHours(0, 0, 0, 0) // 노션 정리하기
    : convertedUpdateEndDate;

  const updatedEventData = {
    dataId: eventDataId,
    place,
    startAt,
    endAt,
    timezone,
    isAllDay,
    description,
  };

  const response = await axios.patch(
    `${API.EVENTS}/${eventDataId}`,
    { updatedEventData },
    { withCredentials: true },
  );

  if (response.data.result === "success") {
    const { updatedEvent } = response.data;

    console.log("Updated Event:", updatedEvent);

    navigate("/calendar");
  }
};

export default updateEventData;
