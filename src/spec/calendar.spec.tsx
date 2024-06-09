import React from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";

import CalendarBody from "../components/Calendar/CalendarBody";
import { CALENDAR_DAYS, MINI_CALENDAR_DAYS } from "../constant/calendar";

const mockAccounts = [
  {
    accountId: "event1",
    events: [
      {
        _id: "event1",
        title: "Test Event Single Day",
        startAt: new Date(2024, 3, 30, 10, 0),
        endAt: new Date(2024, 3, 30, 11, 0),
      },
      {
        _id: "event2",
        title: "Test Event Multi Day",
        startAt: new Date(2024, 3, 27, 10, 0),
        endAt: new Date(2024, 3, 28, 10, 0),
      },
    ],
  },
];

vi.mock("../store/account", () => ({
  useAccountEventStore: vi.fn(() => ({
    accounts: mockAccounts,
    conflictEvents: [],
  })),
}));

vi.mock("../store/dates", async (importOriginal) => {
  const actual = await import("../store/dates");

  return {
    ...actual,
    useCurrentMonthStore: () => ({ currentMonth: new Date(2024, 2, 1) }),
  };
});

describe("CalendarBody", () => {
  it("should renders each day in MINI_CALENDAR_DAYS the correct number of times", () => {
    render(
      <MemoryRouter>
        <CalendarBody isMiniCalendar={true} />
      </MemoryRouter>,
    );

    const dayCounts: { [key in "S" | "M" | "T" | "W" | "F"]: number } = {
      S: 2,
      M: 1,
      T: 2,
      W: 1,
      F: 1,
    };

    MINI_CALENDAR_DAYS.forEach((day, index) => {
      const dayElements = screen.getAllByText(day);
      expect(dayElements).toHaveLength(
        dayCounts[day as "S" | "M" | "T" | "W" | "F"],
      );
    });
  });

  it("should render CALENDAR_DAYS for normal calendar", () => {
    render(
      <MemoryRouter>
        <CalendarBody isMiniCalendar={false} />
      </MemoryRouter>,
    );

    CALENDAR_DAYS.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it("should render Test Event Single Day only on event Date", () => {
    render(
      <MemoryRouter>
        <CalendarBody />
      </MemoryRouter>,
    );
    const eventDate = mockAccounts[0].events[0].startAt;
    const testId = `date-${eventDate.getFullYear()}-${eventDate.getMonth() + 1}-${eventDate.getDate()}`;
    console.log(`Test ID for single day event: ${testId}`);
    const eventContainer = screen.getByTestId(testId);
    console.log("Event container:", eventContainer);

    const eventElement = within(eventContainer).queryByText(
      "Test Event Single Day",
    );

    console.log("Event element:", eventElement);

    expect(eventElement).toBeInTheDocument();
  });

  it("should renders events correctly on their respective dates", () => {
    render(
      <MemoryRouter>
        <CalendarBody />
      </MemoryRouter>,
    );

    const eventStartDate = mockAccounts[0].events[1].startAt;
    const eventEndDate = mockAccounts[0].events[1].endAt;

    const testIdForStart = `date-${eventStartDate.getFullYear()}-${eventStartDate.getMonth() + 1}-${eventStartDate.getDate()}`;
    const testIdForEnd = `date-${eventEndDate.getFullYear()}-${eventEndDate.getMonth() + 1}-${eventEndDate.getDate()}`;

    const startContainer = screen.getByTestId(testIdForStart);
    const endContainer = screen.getByTestId(testIdForEnd);

    const startEventElement = within(startContainer).queryByText(
      "Test Event Multi Day",
    );
    const endEventElement = within(endContainer).queryByText(
      "Test Event Multi Day",
    );

    console.log(startEventElement);
    console.log(endEventElement);

    expect(startEventElement).toBeInTheDocument();
    expect(endEventElement).toBeInTheDocument();
  });
});
