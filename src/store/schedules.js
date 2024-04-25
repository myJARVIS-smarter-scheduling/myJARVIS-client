import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

const conflictScheduleStore = (set) => ({
  conflictEvents: [],
  addConflict: (newConfilct) => set(() => ({ conflictEvents: newConfilct })),
  clearConflicts: () =>
    set(() => ({
      conflictEvents: [],
    })),
});

const selectedEventStore = (set) => ({
  selectedEvent: null,

  setSelectedEvent: (event) => set(() => ({ selectedEvent: event })),
  clearSelectedEvent: () => set(() => ({ selectedEvent: null })),
});

const useSelectedEventStore = create(devtools(selectedEventStore));
const useConflictEventStore = create(
  devtools(
    persist(conflictScheduleStore, {
      name: "conflictEvent",
      storage: createJSONStorage(() => sessionStorage),
    }),
  ),
);

export { useConflictEventStore, useSelectedEventStore };
