import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

interface NavbarOpenStatusState {
  isRightSidebarOpen: boolean;
  isLeftSidebarOpen: boolean;
  navbarItem?: string;
  setIsRightSidebarOpen: (isRightSidebarOpen: boolean) => void;
  setIsLeftSidebarOpen: (isLeftSidebarOpen: boolean) => void;
  setNavbarItem: (navbarItem: string) => void;
  clearNavbarItem(): void;
}

interface CalendarSelectionState {
  selectedCalendars: string[];
  addAccount: (email: string) => void;
  removeAccount: (email: string) => void;
}

interface LoadingStatusState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useNavbarStore = create<NavbarOpenStatusState>()(
  devtools(
    persist(
      (set) => ({
        isLeftSidebarOpen: false,
        isRightSidebarOpen: false,
        navbarItem: undefined, // null이 초기값인데 빈 값도 되는지 확인필요
        setIsRightSidebarOpen: (isRightSidebarOpen) =>
          set({ isRightSidebarOpen }),
        setIsLeftSidebarOpen: (isLeftSidebarOpen) => set({ isLeftSidebarOpen }),
        setNavbarItem: (navbarItem) => set({ navbarItem }),
        clearNavbarItem: () => set({ navbarItem: undefined }),
      }),
      {
        name: "navbar",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

const useLoadingStore = create<LoadingStatusState>()(
  devtools(
    persist(
      (set) => ({
        isLoading: false,
        setIsLoading: (isLoading) => set({ isLoading }),
      }),
      {
        name: "isLoading",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

const useCalendarSelectionStore = create<CalendarSelectionState>()(
  devtools(
    persist(
      (set) => ({
        selectedCalendars: [],
        addAccount: (email) =>
          set((state) => ({
            selectedCalendars: [...state.selectedCalendars, email],
          })),
        removeAccount: (email) =>
          set((state) => ({
            selectedCalendars: state.selectedCalendars.filter(
              (selectedEmail) => selectedEmail !== email,
            ),
          })),
      }),
      {
        name: "calendarSelection",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

export { useNavbarStore, useLoadingStore, useCalendarSelectionStore };
