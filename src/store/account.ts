import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

import { EventData } from "../types/events";
import { User, Account, AccountInfo } from "../types/account";

interface LoginProviderState {
  provider: string;
  user: User | null;
  accountInfo: AccountInfo[];
  setProvider: (provider: string) => void;
  setUser: (user: User) => void;
  setAccountInfo: (accountInfo: AccountInfo[]) => void;
}

interface BiWeeklyEventListState {
  biWeeklyEvents: EventData[];
  addBiWeeklyEvents: (events: EventData[]) => void;
  clearBiWeeklyEvents: () => void;
}

interface AccountEventListState {
  accounts: Account[];
  connectAccount: (accountEventList: Account[]) => void;
  addEvent: (accountIds: string[], newEvent: EventData) => void;
  deleteEvent: (accountId: string, eventId: string) => void;
  updateEvent: (accountId: string, updatedEvents: EventData[]) => void;
}

const useLoginProviderStore = create<LoginProviderState>()(
  devtools(
    persist(
      (set) => ({
        provider: "",
        user: null,
        accountInfo: [],
        setProvider: (provider) => set({ provider }),
        setUser: (user) => set({ user }),
        setAccountInfo: (accountInfo) => set({ accountInfo }),
      }),
      {
        name: "loginProviderKey",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

const useBiWeeklyEventListStore = create<BiWeeklyEventListState>()(
  devtools(
    persist(
      (set) => ({
        biWeeklyEvents: [],
        addBiWeeklyEvents: (events) => set({ biWeeklyEvents: events }),
        clearBiWeeklyEvents: () => set({ biWeeklyEvents: [] }),
      }),
      {
        name: "biWeeklyEventsKey",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

const useAccountEventStore = create<AccountEventListState>()(
  devtools((set) => ({
    accounts: [],
    connectAccount: (accountEventList) => set({ accounts: accountEventList }),
    addEvent: (accountIds, newEvent) => {
      set((state) => ({
        accounts: state.accounts.map((account) =>
          accountIds.includes(account.accountId)
            ? { ...account, events: [...account.events, newEvent] }
            : account,
        ),
      }));
    },
    deleteEvent: (accountId, eventId) => {
      set((state) => ({
        accounts: state.accounts.map((account) =>
          accountId.includes(account.accountId)
            ? {
                ...account,
                events: account.events.filter((event) => event._id !== eventId),
              }
            : account,
        ),
      }));
    },
    updateEvent: (accountId, updatedEvents) => {
      set((state) => ({
        accounts: state.accounts.map((account) =>
          account.accountId === accountId
            ? { ...account, events: updatedEvents }
            : account,
        ),
      }));
    },
  })),
);

export {
  useLoginProviderStore,
  useAccountEventStore,
  useBiWeeklyEventListStore,
};
