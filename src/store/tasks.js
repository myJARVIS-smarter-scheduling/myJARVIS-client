import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

const asanaLoginProviderStore = (set) => ({
  asanaInfo: {},
  workspaceList: [],

  setAsanaInfo: (asanaInfo) => set({ asanaInfo }),
  setWorkspaceList: (workspaceList) => set({ workspaceList }),
});

const asanaWorkspaceStore = (set) => ({
  workspaces: [],

  setWorkspaces: (newWorkspaces) => set({ workspaces: newWorkspaces }),
  addTaskInWorkspace: (targetWorkspaceKey, newTask) =>
    set((state) => ({
      workspaces: state.workspaces.map((workspace) =>
        workspace.workspaceKey === targetWorkspaceKey
          ? { ...workspace, tasks: [...workspace.tasks, newTask] }
          : workspace,
      ),
    })),
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
  updateTasksInWorkspace: (targetWorkspaceKey, newTasks) =>
    set((state) => ({
      workspaces: state.workspaces.map((workspace) =>
        workspace.workspaceKey === targetWorkspaceKey
          ? { ...workspace, tasks: newTasks }
          : workspace,
      ),
    })),
});

const useAsanaLoginProviderStore = create(
  devtools(
    persist(asanaLoginProviderStore, {
      name: "asanaLoginKey",
      storage: createJSONStorage(() => sessionStorage),
    }),
  ),
);

const useAsanaWorkspaceStore = create(devtools(asanaWorkspaceStore));

export { useAsanaLoginProviderStore, useAsanaWorkspaceStore };
