import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CurrentMonthProviderState {
  currentMonth: Date;
  setCurrentMonth: (currentMonth: Date) => void;
}

const useCurrentMonthStore = create<CurrentMonthProviderState>()(
  devtools((set) => ({
    currentMonth: new Date(),
    setCurrentMonth: (currentMonth) => set({ currentMonth }),
  })),
);

export default useCurrentMonthStore;
