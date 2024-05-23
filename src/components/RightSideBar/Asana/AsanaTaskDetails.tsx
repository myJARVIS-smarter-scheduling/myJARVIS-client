import { MdOutlineCheckCircleOutline, MdCheckCircle } from "react-icons/md";
import { IoClose } from "react-icons/io5";

import { useAsanaLoginProviderStore } from "../../../store/TypeScript/tasks";
import { Task, Workspace } from "../../../types/task";

interface AsanaTaskDetailsProps {
  selectedTask: Task;
  handleSelectedTask: (task: Task | null) => void;
}

function AsanaTaskDetails({
  selectedTask,
  handleSelectedTask,
}: AsanaTaskDetailsProps) {
  const { asanaInfo } = useAsanaLoginProviderStore();
  const { title, customFields, dependencies, dependents, link, dueAt, dueOn } =
    selectedTask;

  const dueDate = new Date(dueOn ?? dueAt ?? "").toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const bgColor = ["bg-[#F6AD55]", "bg-[#68D391]", "bg-[#F9A8D4]"];
  const customFieldName =
    customFields.length > 0
      ? customFields.map((field, index) => ({
          name: field.name,
          value: field.display_value,
          color: bgColor[index],
        }))
      : null;

  const dependencyList =
    dependencies.length > 0
      ? dependencies.map((dependency) => ({
          title: dependency.name,
          dueDate: new Date(
            dependency.due_on ?? dependency.due_at ?? "",
          ).toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          link: dependency.link,
        }))
      : null;

  const dependentList =
    dependents.length > 0
      ? dependents.map((dependent) => ({
          title: dependent.name,
          dueDate: new Date(
            dependent.due_on ?? dependent.due_at ?? "",
          ).toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          link: dependent.link,
        }))
      : null;

  return (
    <main className="flex flex-col items-start justify-center w-full space-y-10 bg-white rounded-lg p-15">
      <header className="flex items-center justify-between w-full text-2xl font-bold mb-15">
        <button
          onClick={() => window.open(link, "_blank")}
          className="hover:text-[#DF6064] truncate"
        >
          {title}
        </button>
        <button
          aria-label="Close Task Details"
          onClick={() => handleSelectedTask(null)}
          className="flex items-center justify-center rounded-full w-25 h-25 text-slate-800 hover:bg-slate-400"
        >
          <IoClose size={20} />
        </button>
      </header>
      <section className="flex flex-col items-start justify-center w-full font-light text-slate-700 space-y-15 text-16">
        <div className="flex space-x-30">
          <p className="font-normal">Assignee</p>
          <p className="text-slate-600">{asanaInfo?.name}</p>
        </div>
        <div className="flex space-x-30">
          <p className="font-normal">Due Date</p>
          <p className="text-slate-600">{dueDate}</p>
        </div>
        <div className="flex space-x-30">
          <p className="font-normal">Projects</p>
          <p className="pl-5 text-slate-600">myJARVIS</p>
        </div>
        <div className="flex flex-col items-start justify-center w-full pb-10 space-y-10">
          <p className="font-normal">Dependencies</p>
          {dependencyList?.length ? (
            dependencyList.map((dependency) => (
              <div key={dependency.title} className="p-2">
                <div className="flex items-center w-full space-x-3">
                  <MdOutlineCheckCircleOutline
                    size={17}
                    className="text-[#DF6064]"
                  />
                  <div className="flex items-center w-full h-full space-x-10 text-slate-600">
                    <p className="truncate max-w-150">{dependency.title}</p>
                    <span>&#183;</span>
                    <p className="text-sm">{dependency.dueDate}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="px-10 text-sm text-thin text-slate-400">
              No dependencies
            </p>
          )}
        </div>
        <div className="flex flex-col items-start justify-center w-full pb-10 space-y-10">
          <p className="font-normal">Dependents</p>
          {dependentList?.length ? (
            dependentList.map((dependent) => (
              <div key={dependent.title} className="p-2">
                <div className="flex items-center w-full space-x-3">
                  <MdOutlineCheckCircleOutline
                    size={17}
                    className="text-[#DF6064]"
                  />
                  <div className="flex items-center w-full h-full space-x-10 text-slate-600">
                    <p className="truncate max-w-150">{dependent.title}</p>
                    <span>&#183;</span>
                    <p className="text-sm">{dependent.dueDate}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="px-10 text-sm text-thin text-slate-400">
              No dependents
            </p>
          )}
        </div>
        {customFieldName &&
          customFieldName.map((field) => (
            <aside key={field.name} className="space-y-15">
              <div className="flex items-center space-x-30">
                <p className="font-normal">{field.name}</p>
                <p className="px-5 font-normal text-black rounded bg-slate-200">
                  {field.value}
                </p>
              </div>
            </aside>
          ))}
      </section>
    </main>
  );
}

export default AsanaTaskDetails;
