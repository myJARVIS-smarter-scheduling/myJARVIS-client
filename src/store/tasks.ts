import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

import { AsanaInfo, Workspace } from "../types/task";

interface AsanaLoginProviderState {
  // asanaInfo: AsanaInfo | {};
  asanaInfo: AsanaInfo | null;
  workspaceList: string[];
  setAsanaInfo: (asanaInfo: AsanaInfo) => void;
  setWorkspaceList: (workspaceList: string[]) => void;
}

interface AsanaWorkspaceState {
  workspaces: Workspace[];
  setWorkspaces: (newWorkspaces: Workspace[]) => void;
  deleteTaskInWorkspace: (
    targetWorkspaceId: string,
    targetTaskKey: string,
  ) => void;
}

const useAsanaLoginProviderStore = create<AsanaLoginProviderState>()(
  devtools(
    persist(
      (set) => ({
        // asanaInfo: {},
        asanaInfo: null,
        workspaceList: [],
        setAsanaInfo: (asanaInfo) => set({ asanaInfo }),
        setWorkspaceList: (workspaceList) => set({ workspaceList }),
      }),
      {
        name: "asanaLoginKey",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

const useAsanaWorkspaceStore = create<AsanaWorkspaceState>()(
  devtools((set) => ({
    workspaces: [],
    setWorkspaces: (newWorkspaces) => set({ workspaces: newWorkspaces }),
    deleteTaskInWorkspace: (targetWorkspaceId, targetTaskKey) =>
      set((state) => ({
        workspaces: state.workspaces.map((workspace) =>
          workspace.workspaceId === targetWorkspaceId
            ? {
                ...workspace,
                tasks: workspace.tasks
                  ? workspace.tasks.filter(
                      (task) => task.taskKey !== targetTaskKey,
                    )
                  : [],
              }
            : workspace,
        ),
      })),
  })),
);

export { useAsanaLoginProviderStore, useAsanaWorkspaceStore };
