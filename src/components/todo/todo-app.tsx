"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import { TaskComposer } from "./task-composer";
import { TaskFilters } from "./task-filters";
import { ImportanceFilterControl } from "./task-importance-filter";
import { TaskList } from "./task-list";
import { TaskSummary } from "./task-summary";
import type { Task, TaskFilter, TaskImportance, TaskImportanceFilter } from "./types";

const STORAGE_KEY = "morozumi.todo.tasks";
const DEFAULT_IMPORTANCE: TaskImportance = "medium";

const importanceOrder: Record<TaskImportance, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

function isTaskImportance(value: unknown): value is TaskImportance {
  return value === "low" || value === "medium" || value === "high";
}

function safeParseTasks(payload: string | null): Task[] {
  if (!payload) return [];
  try {
    const parsed = JSON.parse(payload) as Task[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((task) => Boolean(task?.id && task?.title))
      .map((task) => ({
        ...task,
        importance: isTaskImportance(task.importance) ? task.importance : DEFAULT_IMPORTANCE,
      }));
  } catch {
    return [];
  }
}

export function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [importanceFilter, setImportanceFilter] = useState<TaskImportanceFilter>("all");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const persisted = safeParseTasks(
      typeof window === "undefined" ? null : window.localStorage.getItem(STORAGE_KEY)
    );
    startTransition(() => {
      setTasks(persisted);
      setIsHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, isHydrated]);

  const filteredTasks = useMemo(() => {
    const byStatus = (() => {
      switch (filter) {
        case "active":
          return tasks.filter((task) => task.status === "active");
        case "completed":
          return tasks.filter((task) => task.status === "completed");
        default:
          return tasks;
      }
    })();

    const byImportance = importanceFilter === "all"
      ? byStatus
      : byStatus.filter((task) => task.importance === importanceFilter);

    return [...byImportance].sort((a, b) => importanceOrder[a.importance] - importanceOrder[b.importance]);
  }, [filter, importanceFilter, tasks]);

  const activeCount = tasks.filter((task) => task.status === "active").length;
  const completedCount = tasks.length - activeCount;
  const highCount = tasks.filter((task) => task.importance === "high").length;
  const mediumCount = tasks.filter((task) => task.importance === "medium").length;
  const lowCount = tasks.filter((task) => task.importance === "low").length;

  const addTask = (title: string, importance: TaskImportance, deadline?: string) => {
    setTasks((current) => [
      {
        id: crypto.randomUUID(),
        title,
        status: "active",
        createdAt: new Date().toISOString(),
        importance,
        deadline,
      },
      ...current,
    ]);
  };

  const toggleTask = (id: string) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "completed" ? "active" : "completed",
              completedAt:
                task.status === "completed" ? undefined : new Date().toISOString(),
            }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((current) => current.filter((task) => task.status !== "completed"));
  };

  return (
    <section className="space-y-6">
      <TaskComposer onSubmit={addTask} />
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/40 p-6 shadow-xl shadow-black/30">
        <div className="flex flex-wrap items-center gap-4">
          <div className="w-full md:max-w-sm">
            <TaskSummary
              total={tasks.length}
              active={activeCount}
              completed={completedCount}
              high={highCount}
              medium={mediumCount}
              low={lowCount}
            />
          </div>
          <div className="flex flex-1 flex-wrap items-center justify-end gap-4">
            <ImportanceFilterControl value={importanceFilter} onChange={setImportanceFilter} />
            <TaskFilters value={filter} onChange={setFilter} />
            <button
              type="button"
              onClick={clearCompleted}
              disabled={!completedCount}
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear done
            </button>
          </div>
        </div>
        <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
      </div>
    </section>
  );
}
