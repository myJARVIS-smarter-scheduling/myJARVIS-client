import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
  useAccountEventStore,
  useLoginProviderStore,
  useBiWeeklyEventListStore,
} from "../store/account";
import ConflictSchedule from "../components/LeftSideBar/ConflictSchedule";

const mockAccountInfo = [
  { email: "googleUser@gmail.com", accountId: "1" },
  { emai: "microsoftUser@outlook.com", accountId: "2" },
];

const mockAccountList = [
  {
    accountId: "account1",
    email: "googleUser@gmail.com",
    events: [
      {
        _id: "event1",
        accountId: "account1",
        title: "test event 1",
        place: "Test Place",
        attendees: ["tester1@example.com, tester2@example.com"],
        description: "Test Description",
        startAt: new Date(2024, 4, 2, 14, 0),
        endAt: new Date(2024, 4, 2, 15, 0),
        provider: "google",
        eventId: "uniqueKeyOfEvent1",
        timezone: "Asia/Seoul",
        etag: "12345",
        __v: 0,
      },
    ],
  },
  {
    accountId: "account2",
    email: "microsoftUser@outlook.com",
    events: [
      {
        _id: "event2",
        accountId: "account2",
        title: "test event 2",
        attendees: ["tester1@example.com"],
        place: "Test Place",
        description: "Test Description",
        startAt: new Date(2024, 4, 2, 14, 30),
        endAt: new Date(2024, 4, 2, 15, 30),
        provider: "microsoft",
        eventId: "uniqueKeyOfEvent2",
        timezone: "Asia/Seoul",
        etag: "67890",
        __v: 1,
      },
    ],
  },
];

const mockConflicts = mockAccountList.flatMap((account) => account.events);

vi.mock("../store/account", () => ({
  useAccountEventStore: () => ({
    accounts: mockAccountList,
    connectAccount: vi.fn(),
    addConflict: vi.fn(),
  }),
  useLoginProviderStore: () => ({
    accountInfo: mockAccountInfo,
  }),
  useBiWeeklyEventListStore: () => ({
    biWeeklyEvents: [],
    addBiWeeklyEvents: vi.fn(),
  }),
}));

describe("ConflictList Component", () => {
  it("renders ConflictSchedule components with correct information when there are schedule conflicts", async () => {
    render(
      mockConflicts.map((conflictEvent, index) => (
        <MemoryRouter>
          <ConflictSchedule
            key={conflictEvent._id}
            conflictEvents={conflictEvent}
            accountIndex={index}
          />
        </MemoryRouter>
      )),
    );

    const firstEventTitle = await screen.findByText("test event 1");
    expect(firstEventTitle).toBeInTheDocument();

    const secondEventTitle = await screen.findByText("test event 2");
    expect(secondEventTitle).toBeInTheDocument();
  });
});
