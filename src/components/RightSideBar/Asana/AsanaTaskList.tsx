import { useState, useEffect } from "react";
import {
  useAsanaLoginProviderStore,
  useAsanaWorkspaceStore,
} from "../../../store/TypeScript/tasks";
import { useLoadingStore } from "../../../store/TypeScript/navbar";

import AsanaBoardItem from "./AsanaBoardItem";
import AsanaTaskDetails from "./AsanaTaskDetails";
import DropdownMenu from "../../../shared/DropdownMenu";

import { Task } from "../../../types/task";

interface AsanaTaskListProps {
  handleFetchStatus: (status: boolean) => void;
}

function AsanaTaskList({ handleFetchStatus }: AsanaTaskListProps) {
  const { workspaces } = useAsanaWorkspaceStore();
  const { workspaceList } = useAsanaLoginProviderStore();
  const { isLoading } = useLoadingStore();
  // const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedWorkspace, setSelectedWorkspace] = useState(
    workspaces.length > 0 ? workspaces[0].workspaceId : "",
  );
  const workspaceOptions = workspaces.map((workspace) => ({
    label: workspace.workspaceName,
    value: workspace.workspaceId,
  }));

  const workspacePlaceholder =
    workspaceList.length > 0 ? workspaceList[0] : "Select Workspace";

  return (
    <main className="flex flex-col h-full px-5 space-y-20 overflow-hidden">
      <nav className="text-sm font-normal w-165">
        <DropdownMenu
          options={workspaceOptions}
          placeholder={workspacePlaceholder}
          handleOptionChange={setSelectedWorkspace}
        />
      </nav>
      {selectedTask && (
        <AsanaTaskDetails
          aria-label="Asana task details"
          selectedTask={selectedTask}
          handleSelectedTask={setSelectedTask}
        />
      )}
      {!selectedTask && !isLoading && (
        <section
          className="flex flex-col w-full h-full space-y-20 overflow-y-auto"
          style={{ maxHeight: "80vh" }}
        >
          {workspaces
            .filter((workspace) => workspace.workspaceId === selectedWorkspace)
            .map((workspace) =>
              workspace.tasks.map((task) => (
                <button
                  aria-label="View Asana task details"
                  key={task._id}
                  onClick={() => setSelectedTask(task)}
                >
                  <AsanaBoardItem
                    taskInfo={task}
                    handleFetchStatus={handleFetchStatus}
                  />
                </button>
              )),
            )}
        </section>
      )}
    </main>
  );
}

export default AsanaTaskList;
