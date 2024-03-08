import { create } from "zustand";
import { devtools } from "zustand/middleware";

const loginProviderStore = (set) => ({
  provider: "",
  setProvider: (provider) => set({ provider }),
});

const useLoginProviderStore = create(devtools(loginProviderStore));

export default useLoginProviderStore;
