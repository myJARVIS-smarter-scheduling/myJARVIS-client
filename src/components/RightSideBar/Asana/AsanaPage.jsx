import { useState, useEffect } from "react";
import axios from "axios";

import {
  useAsanaLoginProviderStore,
  useAsanaWorkspaceStore,
} from "../../../store/tasks";
import { useLoadingStore } from "../../../store/navbar";

import AsanaLogin from "./AsanaLogin";
import AsanaTaskList from "./AsanaTaskList";
import LoadingSpinner from "./LoadingSpinner";

import API from "../../../config/api";

function AsanaPage() {
  const { asanaInfo, setAsanaInfo, setWorkspaceList } =
    useAsanaLoginProviderStore();
  const { workspaces, setWorkspaces } = useAsanaWorkspaceStore();
  const { isLoading, setIsLoading } = useLoadingStore();
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (workspaces.length === 0 && asanaInfo.name) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [setWorkspaces, setAsanaInfo]);

  useEffect(() => {
    async function fetchAsanaData() {
      const response = await axios.post(
        API.TASKS.ASANA,
        {},
        { withCredentials: true },
      );

      if (response.data.result === "success") {
        const { asanaUserInfo, taskList } = await response.data;
        const workspaceName = taskList.map(
          (workspace) => workspace.workspaceName,
        );

        setAsanaInfo(asanaUserInfo);
        setWorkspaces(taskList);
        setWorkspaceList(workspaceName);
      }

      if (asanaInfo && workspaces) {
        setIsLoading(false);
      }
    }

    if (!isFetched) {
      fetchAsanaData();
      setIsFetched(true);
    }
  }, [isFetched]);

  return (
    <main
      className="relative w-full h-full py-10 space-y-10 overflow-hidden"
      key={asanaInfo}
    >
      {asanaInfo.name && asanaInfo.email ? (
        <AsanaTaskList handleFetchStatus={setIsFetched} />
      ) : (
        <AsanaLogin />
      )}
      {isLoading && <LoadingSpinner />}
    </main>
  );
}

export default AsanaPage;
