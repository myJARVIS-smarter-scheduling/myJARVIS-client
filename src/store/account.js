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

  addBiWeeklyEvents: (newEvents) =>
    set((state) => ({ biWeeklyEvents: newEvents })),
  clearBiWeeklyEvents: () =>
    set(() => ({
      biWeeklyEvents: [],
    })),
});

const accountEventListStore = (set) => ({
  accounts: [],
  // conflictEvents: [],
  connectAccount: (accountEventList) =>
    set((state) => ({
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
  updateEvent: (accountIds, updatedEvent) => {
    set((state) => ({
      accounts: state.accounts.map((account) =>
        accountIds.includes(account.accountId)
          ? {
              ...account,
              events: account.events.map((event) =>
                event._id === updatedEvent._id ? updatedEvent : event,
              ),
            }
          : account,
      ),
    }));
  },
  // addConflict: (newConfilct) =>
  //   set((state) => ({ conflictEvents: newConfilct })),
  // clearConflicts: () =>
  //   set(() => ({
  //     conflictEvents: [],
  //   })),
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
