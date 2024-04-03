import React from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import ScheduleDetails from "../components/Schedule/ScheduleDetails";

const mockUserInfo = { email: "user@example.com", timezone: "Asia/Seoul" };
const mockAccountInfo = [
  { email: "user@example.com", accountId: "1" },
  { emai: "user2@example.com", accountId: "2" },
];
const eventInfo = {
  _id: "event1",
  accountId: "account1",
  title: "Test Event Single Day",
  place: "Test Place",
  attendees: ["tester1@example.com, tester2@example.com"],
  description: "Test Description",
  startAt: new Date(2024, 4, 2, 14, 0),
  endAt: new Date(2024, 4, 2, 15, 0),
  provider: "google",
  eventId: "uniqueKeyOfEvent1",
  timezone: "Asia/Seoul",
};

const mockAccountList = [
  {
    accountId: "account1",
    email: "user@example.com",
    events: [eventInfo],
  },
];

vi.mock("../store/account", () => ({
  useLoginProviderStore: vi.fn(() => ({
    user: mockUserInfo,
    accountInfo: mockAccountInfo,
  })),
  useAccountEventStore: vi.fn(() => ({
    accounts: mockAccountList,
  })),
  useBiWeeklyEventListStore: vi.fn(() => ({
    biWeeklyEvents: [],
  })),
}));

describe("ScheduleDetails Component with isNewEvent=true", () => {
  beforeEach(() => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/events/new",
            state: { isNewEvent: true, dateOfEvent: new Date() },
          },
        ]}
      >
        <ScheduleDetails isNewEvent={true} />
      </MemoryRouter>,
    );
  });

  it("should render today's date in the startDate and endDate fields for a new event", () => {
    const today = new Date();
    const formattedDate = today
      .toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
      .replaceAll(",", "");

    const startDateInput = screen.getByPlaceholderText("StartDate");
    const endDateInput = screen.getByPlaceholderText("EndDate");

    expect(startDateInput.value).toBe(formattedDate);
    expect(endDateInput.value).toBe(formattedDate);
  });

  it("should have empty input fields for title, attendees, and location", () => {
    const titleInput = screen.getByRole("textbox", { name: "title" });
    const placeInput = screen.getByRole("textbox", { name: "place" });
    const attendeeList = screen.queryByTestId("attendeeList");

    expect(titleInput.value).toBe("");
    expect(placeInput.value).toBe("");
    expect(attendeeList).toBeNull();
  });

  it("should display 10:00 AM as starttime and 11:00 AM as endtime for a new event", async () => {
    const startTime = screen.getByRole("textbox", { name: "startTime" });
    const endTime = screen.getByRole("textbox", { name: "endTime" });

    expect(startTime.value).toBe("10:00 AM");
    expect(endTime.value).toBe("11:00 AM");
  });

  it("should display the user's default timezone for a new event", async () => {
    const mockTimezoneLabel = "(GMT+09:00) Korean Standard Time - Seoul";
    const timezoneInput = screen.getByTestId("timezoneInput");

    expect(timezoneInput.value).toBe(mockTimezoneLabel);
  });
});

describe("ScheduleDetails Component with isNewEvent=false", () => {
  beforeEach(() => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: `/events/${eventInfo._id}/editing`,
            state: { event: eventInfo },
          },
        ]}
      >
        <ScheduleDetails isNewEvent={false} />
      </MemoryRouter>,
    );
  });

  it("should render event's date in the startDate and endDate fields for a selected Event", () => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    const formattedStartDate = formatter
      .format(eventInfo.startAt)
      .replaceAll(",", "");
    const formattedEndDate = formatter
      .format(eventInfo.endAt)
      .replaceAll(",", "");

    const startDateInput = screen.getByPlaceholderText("StartDate");
    const endDateInput = screen.getByPlaceholderText("EndDate");

    expect(startDateInput.value).toBe(formattedStartDate);
    expect(endDateInput.value).toBe(formattedEndDate);
  });

  it("should display the event's details in the title, place, and attendees input fields", () => {
    const titleInput = screen.getByRole("textbox", { name: "title" });
    const placeInput = screen.getByRole("textbox", { name: "place" });

    const attendeeList = screen.queryAllByTestId("attendeeList");
    const renderedAttendees = attendeeList.map((item) =>
      item.textContent.trim(),
    );

    expect(titleInput.value).toBe(eventInfo.title);
    expect(placeInput.value).toBe(eventInfo.place);
    expect(renderedAttendees).toEqual(
      expect.arrayContaining(eventInfo.attendees),
    );
  });

  it("should display the event's start time and end time in time fields", async () => {
    const startTime = screen.getByRole("textbox", { name: "startTime" });
    const endTime = screen.getByRole("textbox", { name: "endTime" });

    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const formattedStartTime = formatter.format(eventInfo.startAt);
    const formattedEndTime = formatter.format(eventInfo.endAt);

    expect(startTime.value).toBe(formattedStartTime);
    expect(endTime.value).toBe(formattedEndTime);
  });
});
