import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

const loginProviderStore = (set) => ({
  provider: "",
  user: {},
  accountInfo: [],

  setProvider: (provider) => set({ provider }),
  setUser: (user) => set({ user }),
  setAccountInfo: (accountInfo) => set({ accountInfo }),
});

const biWeeklyEventListStore = (set) => ({
  biWeeklyEvents: [],

  addBiWeeklyEvents: (newEvents) => set(() => ({ biWeeklyEvents: newEvents })),
  clearBiWeeklyEvents: () =>
    set(() => ({
      biWeeklyEvents: [],
    })),
});

const accountEventListStore = (set) => ({
  accounts: [],
  connectAccount: (accountEventList) =>
    set(() => ({
      accounts: accountEventList,
    })),
  addEvent: (accountIds, newEvent) => {
    set((state) => ({
      accounts: state.accounts.map((account) =>
        accountIds.includes(account.accountId)
          ? { ...account, events: [...account.events, newEvent] }
          : account,
      ),
    }));
  },
  deleteEvent: (accountIds, eventId) => {
    set((state) => ({
      accounts: state.accounts.map((account) =>
        accountIds.includes(account.accountId)
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
});

const useLoginProviderStore = create(
  devtools(
    persist(loginProviderStore, {
      name: "loginProviderKey",
      storage: createJSONStorage(() => sessionStorage),
    }),
  ),
);

const useBiWeeklyEventListStore = create(
  devtools(
    persist(biWeeklyEventListStore, {
      name: "biWeeklyEventsKey",
      storage: createJSONStorage(() => sessionStorage),
    }),
  ),
);

const useAccountEventStore = create(devtools(accountEventListStore));

export {
  useLoginProviderStore,
  useAccountEventStore,
  useBiWeeklyEventListStore,
};
