export type TaskStatus = "active" | "completed";

export type TaskFilter = "all" | "active" | "completed";

export type TaskImportance = "low" | "medium" | "high";

export type TaskImportanceFilter = "all" | TaskImportance;

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: string;
  importance: TaskImportance;
  completedAt?: string;
  deadline?: string;
}
