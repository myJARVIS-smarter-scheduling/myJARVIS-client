import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

const navbarOpenStatusStore = (set) => ({
  isRightSidebarOpen: false,
  setisRightSidebarOpen: (status) => set({ isRightSidebarOpen: status }),

  isLeftSidebarOpen: true,
  setisLeftSidebarOpen: (status) => set({ isLeftSidebarOpen: status }),

  navbarItem: null,
  setNavbarItems: (item) => set({ navbarItem: item }),
});

const loadingStatusStore = (set) => ({
  isLoading: false,
  setIsLoading: (status) => set({ isLoading: status }),
});

const useNavbarStore = create(
  devtools(
    persist(navbarOpenStatusStore, {
      name: "navbar",
      storage: createJSONStorage(() => sessionStorage),
    }),
  ),
);

const useLoadingStore = create(
  devtools(
    persist(loadingStatusStore, {
      name: "isLoading",
      storage: createJSONStorage(() => sessionStorage),
    }),
  ),
);

export { useNavbarStore, useLoadingStore };
