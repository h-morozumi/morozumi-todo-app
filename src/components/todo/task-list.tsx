"use client";

import type { Task } from "./types";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const IMPORTANCE_LABEL: Record<Task["importance"], string> = {
  high: "High impact",
  medium: "Medium focus",
  low: "Low stakes",
};

const formatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (!tasks.length) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-white/10 bg-white/5 px-6 py-12 text-center text-slate-400">
        <p className="text-base font-medium text-white/80">You&apos;re all caught up ✨</p>
        <p className="text-sm text-slate-400">
          New tasks will appear here. Capture the next small win above.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-slate-900/60 px-4 py-4 shadow-lg shadow-black/10 transition hover:border-cyan-400/40"
        >
          <button
            type="button"
            onClick={() => onToggle(task.id)}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-slate-950/40 text-white transition group-hover:border-cyan-300/60"
            aria-label={task.status === "completed" ? "Mark task as active" : "Mark task as completed"}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-xl border-2 text-[10px] font-bold ${
                task.status === "completed"
                  ? "border-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
                  : "border-slate-500/40"
              }`}
            >
              {task.status === "completed" ? "✓" : null}
            </span>
          </button>
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <p
                className={`text-base font-semibold text-white ${
                  task.status === "completed" ? "text-white/60 line-through" : ""
                }`}
              >
                {task.title}
              </p>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium uppercase tracking-wide ${
                  task.importance === "high"
                    ? "bg-rose-500/20 text-rose-100"
                    : task.importance === "medium"
                      ? "bg-amber-400/20 text-amber-100"
                      : "bg-emerald-400/20 text-emerald-100"
                }`}
              >
                {task.importance}
              </span>
            </div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Added {formatter.format(new Date(task.createdAt))} · {IMPORTANCE_LABEL[task.importance]}
              {task.deadline && ` · Due ${formatter.format(new Date(task.deadline))}`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
