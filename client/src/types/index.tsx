export type TaskT = {
  id: string;
  title: string;
  description: string;
  priority: string;
  deadline: number;
  image?: string;
  alt?: string;
  tags: { title: string; bg: string; text: string }[];
};

type Column = {
  name: string;
  items: TaskT[];
};

export type Columns = {
  [key: string]: Column;
};

export interface ITask extends Document {
  _id: string;
  title: string;
  description: string;
  status: "Pending" | "InProgress" | "Completed";
  completedAt: Date;
}
