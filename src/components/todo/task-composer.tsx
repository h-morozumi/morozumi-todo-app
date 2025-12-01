"use client";

import { useState } from "react";
import type { TaskImportance } from "./types";

interface TaskComposerProps {
  onSubmit: (title: string, importance: TaskImportance) => void;
}

const IMPORTANCE_OPTIONS: { id: TaskImportance; label: string; hint: string }[] = [
  { id: "high", label: "High", hint: "Needs attention soon" },
  { id: "medium", label: "Medium", hint: "Important but flexible" },
  { id: "low", label: "Low", hint: "Nice to do" },
];

export function TaskComposer({ onSubmit }: TaskComposerProps) {
  const [title, setTitle] = useState("");
  const [importance, setImportance] = useState<TaskImportance>("medium");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    onSubmit(trimmed, importance);
    setTitle("");
    setImportance("medium");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/5 backdrop-blur"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="new-task" className="text-sm font-medium text-slate-200">
          Add something meaningful
        </label>
        <p className="text-xs text-slate-400">Capture the task, then tag its importance.</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="new-task"
          name="new-task"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Capture a thought, action, or reminder..."
          className="flex-1 rounded-xl border border-white/10 bg-slate-900/40 px-4 py-3 text-base text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
          autoComplete="off"
          aria-label="New task description"
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className="rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Add Task
        </button>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Task importance">
        {IMPORTANCE_OPTIONS.map((option) => {
          const isActive = option.id === importance;
          return (
            <button
              key={option.id}
              type="button"
              className={`flex flex-col rounded-2xl border px-4 py-2 text-left text-sm transition ${
                isActive
                  ? "border-cyan-300/70 bg-cyan-300/10 text-white"
                  : "border-white/10 text-slate-300 hover:text-white"
              }`}
              onClick={() => setImportance(option.id)}
              aria-pressed={isActive}
            >
              <span className="font-semibold">{option.label}</span>
              <span className="text-xs text-slate-400">{option.hint}</span>
            </button>
          );
        })}
      </div>
    </form>
  );
}
