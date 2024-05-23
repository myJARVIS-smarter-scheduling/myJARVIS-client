interface Project {
  gid: string;
  resource_type: string;
}

interface CustomField {
  name: string;
  display_value: string;
}

interface Dependieces {
  name: string;
  due_on: string | null;
  due_at: string | null;
  link: string;
}

export interface AsanaInfo {
  email: string;
  name: string;
}

export interface Task {
  _id: string;
  userId: string;
  asanaId: string;
  workspaceId: string;
  taskKey: string;
  title: string;
  project: Project[];
  dependencies: Dependieces[];
  dependents: Dependieces[];
  link: string;
  startAt: string | null;
  startOn: string | null;
  dueOn: string | null;
  dueAt: string | null;
  customFields: CustomField[];
  __v: number;
}

export interface Workspace {
  asanaId: string;
  workspaceId: string;
  workspaceName: string;
  tasks: Task[];
}
