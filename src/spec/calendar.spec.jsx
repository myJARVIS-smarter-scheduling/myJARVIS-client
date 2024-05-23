import React from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";

import CalendarBody from "../components/Calendar/CalendarBody";
import { CALENDAR_DAYS, MINI_CALENDAR_DAYS } from "../constant/calendar.ts";

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
  const actual = await importOriginal();
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

    const dayCounts = { S: 2, M: 1, T: 2, W: 1, F: 1, S: 2 };

    MINI_CALENDAR_DAYS.forEach((day, index) => {
      const dayElements = screen.getAllByText(day);
      expect(dayElements).toHaveLength(dayCounts[day]);
    });
  });

  it("should render CALENDAR_DAYS for normal calendar", () => {
    render(
      <MemoryRouter>
        <CalendarBody miniCalendar={false} />
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
    const testId = `date-${eventDate.getFullYear()}-${eventDate.getMonth()}-${eventDate.getDate() + 1}`;
    const march30Container = screen.getByTestId(testId);

    expect(
      within(march30Container).getByText("Test Event Single Day"),
    ).toBeInTheDocument();
  });

  it("should renders events correctly on their respective dates", () => {
    render(
      <MemoryRouter>
        <CalendarBody />
      </MemoryRouter>,
    );

    const eventStartDate = mockAccounts[0].events[1].startAt;
    const eventEndDate = mockAccounts[0].events[1].endAt;
    const testIdForStart = `date-${eventStartDate.getFullYear()}-${eventStartDate.getMonth()}-${eventStartDate.getDate() + 1}`;
    const testIdForEnd = `date-${eventEndDate.getFullYear()}-${eventEndDate.getMonth()}-${eventEndDate.getDate() + 1}`;
    const startContainer = screen.getByTestId(testIdForStart);
    const endContainer = screen.getByTestId(testIdForEnd);

    expect(
      within(startContainer).getByText("Test Event Multi Day"),
    ).toBeInTheDocument();
  });
});
