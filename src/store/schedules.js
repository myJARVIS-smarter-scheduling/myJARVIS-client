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

const useConflictEventStore = create(
  devtools(
    persist(conflictScheduleStore, {
      name: "conflictEvent",
      storage: createJSONStorage(() => sessionStorage),
    }),
  ),
);

export default useConflictEventStore;
