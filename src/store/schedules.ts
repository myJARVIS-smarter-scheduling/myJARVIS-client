import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

import { CalendarEvent, Schedule } from "../types/events";

interface ConflictScheduleState {
  conflictEvents: Schedule[];
  addConflict: (newConflict: Schedule[]) => void;
  clearConflicts: () => void;
}

interface SelectedEventState {
  selectedEvent?: CalendarEvent;
  setSelectedEvent: (newEvent: CalendarEvent) => void;
  clearSelectedEvent: () => void;
}

const useSelectedEventStore = create<SelectedEventState>()(
  devtools((set) => ({
    selectedEvent: undefined, // null이 초기값인데 undefined 값도 되는지 확인필요
    // 안된다면 selectedEvent: SelectedEvent | null; 로 변경 필요
    setSelectedEvent: (newEvent) => set({ selectedEvent: newEvent }),
    clearSelectedEvent: () => set({ selectedEvent: undefined }),
  })),
);

const useConflictEventStore = create<ConflictScheduleState>()(
  devtools(
    persist(
      (set) => ({
        conflictEvents: [],
        addConflict: (newConflict) => set({ conflictEvents: newConflict }),
        clearConflicts: () => set({ conflictEvents: [] }),
      }),
      {
        name: "conflictEvent",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

export { useConflictEventStore, useSelectedEventStore };
