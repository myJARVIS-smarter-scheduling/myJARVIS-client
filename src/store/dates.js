import { create } from "zustand";
import { devtools } from "zustand/middleware";

const currentMonthProviderStore = (set) => ({
  currentMonth: new Date(),
  setCurrentMonth: (newMonth) => set({ currentMonth: newMonth }),

  selectedDate: null,
  setSelectedDate: (selectedDate) => set({ selectedDate }),
});

const useCurrentMonthStore = create(devtools(currentMonthProviderStore));

export default useCurrentMonthStore;
