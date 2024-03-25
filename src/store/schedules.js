import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

const conflictScheduleStore = (set) => ({
  conflictEvent: {},
  setConflictEvent: (conflict) => set({ conflictEvent: conflict }),
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
