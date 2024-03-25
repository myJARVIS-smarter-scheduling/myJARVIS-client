import { useState } from "react";
import axios from "axios";

import { LiaCalendarCheck } from "react-icons/lia";
// import { AiOutlineComment } from "react-icons/ai";
import { MdOutlineCheckCircleOutline, MdCheckCircle } from "react-icons/md";
import { RiStackshareLine } from "react-icons/ri";
import { RxExternalLink } from "react-icons/rx";

import { useAsanaWorkspaceStore } from "../../../store/tasks";
import { useLoadingStore } from "../../../store/navbar";
import API from "../../../config/api";

function AsanaBoardItem({ taskInfo, handleFetchStatus }) {
  const [isHovered, setIsHovered] = useState(false);
  const { setIsLoading } = useLoadingStore();
  const { deleteTaskInWorkspace, workspaces } = useAsanaWorkspaceStore();
  const {
    title,
    customFields,
    dependencies,
    dependents,
    link,
    dueAt,
    dueOn,
    taskKey,
    workspaceId,
  } = taskInfo;

  const targetWorkspace = workspaces.find(
    (workspace) => workspace.workspaceId === workspaceId,
  );

  const customFieldName =
    customFields.length > 0
      ? customFields.map((field) => ({
          name: field.name,
          value: field.display_value,
        }))
      : null;

  const hasCustomField =
    customFields.filter((field) => field.display_value !== null).length > 0;
  const dueDate = new Date(dueOn || dueAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });

  async function handleCompleteTask(event) {
    event.stopPropagation();
    setIsLoading(true);

    const response = await axios.post(
      `${API.TASKS.ASANA}/${taskKey}/archivement`,
      { taskKey },
      { withCredentials: true },
    );

    if (response.data.result === "success") {
      deleteTaskInWorkspace(targetWorkspace.workspaceId, taskKey);
      setIsLoading(false);
      handleFetchStatus(false);
    }
  }

  return (
    <main className="flex flex-col items-start justify-center px-20 space-y-10 bg-white rounded-md shadow-lg min-h-130">
      <div className="flex items-center justify-between w-full">
        <button
          aria-label="Complete Task"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(event) => handleCompleteTask(event)}
          className="flex items-center w-full h-full"
        >
          {isHovered ? (
            <MdCheckCircle size={20} className="mr-5 hover:text-teal-200" />
          ) : (
            <MdOutlineCheckCircleOutline
              size={20}
              className="mr-5 hover:text-teal-200"
            />
          )}
          <p className="font-semibold text-center text-15">{title}</p>
        </button>
        <button
          type="button"
          aria-label="Open external link"
          onClick={() => window.open(link, "_blank")}
          className="flex items-center justify-center w-40 h-auto"
        >
          <RxExternalLink size={20} className="mr-5 hover:text-teal-200" />
        </button>
      </div>
      <div className="flex items-center space-x-10">
        {hasCustomField
          ? customFieldName.map((field, index) => (
              <p
                key={field.name}
                className="flex items-center justify-center h-20 px-10 rounded-lg py-13 text-13 text-slate-800 bg-[#eaeaea]"
              >
                <span className="font-semibold">{field.value}</span>
              </p>
            ))
          : null}
        <p></p>
      </div>
      <div className="flex items-center justify-between w-full">
        <section className="flex items-center space-x-10">
          <div className="flex items-center">
            <LiaCalendarCheck size={20} className="text-[#EE5350]" />
          </div>
          <span className="text-sm font-light">{dueDate}</span>
        </section>
        <section className="flex space-x-15">
          {/* TODO. 추후 comment 갯수 및 내용을 가져오는 로직을 구현합니다. */}
          {/* <div className="flex items-center space-x-3">
            <span>7</span>
            <AiOutlineComment className="text-[#EE5350]" />
          </div> */}
          <div className="flex items-center space-x-3">
            <span>{dependencies.length + dependents.length}</span>
            <RiStackshareLine className="text-[#EE5350]" />
          </div>
        </section>
      </div>
    </main>
  );
}

export default AsanaBoardItem;
