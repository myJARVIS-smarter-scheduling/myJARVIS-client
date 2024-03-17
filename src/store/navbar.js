import { create } from "zustand";
import { devtools } from "zustand/middleware";

const navbarOpenStatus = (set) => ({
  isSidebarOpen: false,
  setIsSidebarOpen: (status) => set({ isSidebarOpen: status }),

  navbarItem: null,
  setNavbarItems: (item) => set({ navbarItem: item }),
});

const useNavbarStore = create(devtools(navbarOpenStatus));

export default useNavbarStore;
