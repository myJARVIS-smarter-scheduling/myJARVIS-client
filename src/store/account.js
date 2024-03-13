import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

const loginProviderStore = (set) => ({
  provider: "",
  setProvider: (provider) => set({ provider }),

  user: "",
  setUser: (user) => set({ user }),
});

const accountEventListStore = (set) => ({
  accounts: [],
  connectAccount: (accountEventList) =>
    set((state) => ({
      accounts: [...state.accounts, ...accountEventList],
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
                event._id === updatedEvent.id ? updatedEvent : event,
              ),
            }
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

const useAccountEventStore = create(devtools(accountEventListStore));

export { useLoginProviderStore, useAccountEventStore };
