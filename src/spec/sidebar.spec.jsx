import React from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import RightSideBarItems from "../components/RightSideBar/RightSideBarItems";

import { useNavbarStore } from "../store/navbar";

const mockUserInfo = { email: "user@gmail.com", timezone: "Asia/Seoul" };
const mockAccountInfo = [
  { email: "user@gmail.com", accountId: "1" },
  { emai: "user2@outlook.com", accountId: "2" },
];

const mockAccountList = [
  {
    accountId: "account1",
    email: "googleUser@gmail.com",
    events: [],
  },
  {
    accountId: "account1",
    email: "microsoftUser@outlook.com",
    events: [],
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
}));

vi.mock("../store/navbar", () => ({
  useNavbarStore: vi.fn(),
  useCalendarSelectionStore: vi.fn(() => ({
    selectedCalendars: [],
    addAccount: vi.fn(),
    removeAccount: vi.fn(),
  })),
  useLoadingStore: vi.fn(() => ({
    isLoading: false,
    setIsLoading: vi.fn(),
  })),
}));

vi.mock("../store/tasks", () => ({
  useAsanaLoginProviderStore: vi.fn(() => ({
    asanaInfo: {},
    setAsanaInfo: vi.fn(),
    setWorkspaceList: vi.fn(),
  })),
  useAsanaWorkspaceStore: vi.fn(() => ({
    workspaces: [],
    setWorkspaces: vi.fn(),
  })),
}));

vi.mock("axios", () => ({
  default: {
    post: vi.fn(() =>
      Promise.resolve({
        data: {
          result: "fail",
        },
      }),
    ),
  },
}));

describe("RightSideBar Component", () => {
  it("should render EmailConnection component when navbarItem is profile", async () => {
    vi.mocked(useNavbarStore).mockImplementation(() => ({
      navbarItem: "profile",
      setisRightSidebarOpen: vi.fn(),
      setNavbarItems: vi.fn(),
    }));

    render(
      <MemoryRouter>
        <RightSideBarItems />
      </MemoryRouter>,
    );

    expect(screen.queryByText("Connected Calendars")).toBeInTheDocument();
    expect(screen.queryByText("Add Calendar")).toBeInTheDocument();
  });

  it("should render UserSettings component when navbarItem is settings", async () => {
    vi.mocked(useNavbarStore).mockImplementation(() => ({
      navbarItem: "settings",
      setisRightSidebarOpen: vi.fn(),
      setNavbarItems: vi.fn(),
    }));

    render(
      <MemoryRouter>
        <RightSideBarItems />
      </MemoryRouter>,
    );

    expect(screen.queryByText("googleUser")).toBeInTheDocument();
    expect(screen.queryByText("microsoftUser")).toBeInTheDocument();
  });

  it("should render AsanaLogin component when navbarItem is asana and there is no login info", async () => {
    vi.mocked(useNavbarStore).mockImplementation(() => ({
      navbarItem: "asana",
      setisRightSidebarOpen: vi.fn(),
      setNavbarItems: vi.fn(),
    }));

    render(
      <MemoryRouter>
        <RightSideBarItems />
      </MemoryRouter>,
    );

    expect(screen.queryByText("Login with asana")).toBeInTheDocument();
  });
});
