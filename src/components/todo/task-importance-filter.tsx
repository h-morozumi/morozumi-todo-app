"use client";

import type { TaskImportanceFilter } from "./types";

const OPTIONS: { id: TaskImportanceFilter; label: string }[] = [
  { id: "all", label: "Any" },
  { id: "high", label: "High" },
  { id: "medium", label: "Medium" },
  { id: "low", label: "Low" },
];

interface ImportanceFilterControlProps {
  value: TaskImportanceFilter;
  onChange: (filter: TaskImportanceFilter) => void;
}

export function ImportanceFilterControl({ value, onChange }: ImportanceFilterControlProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/40 px-3 py-1 text-xs text-white/70">
      <span className="font-semibold uppercase tracking-wide text-slate-400">Importance</span>
      <div className="inline-flex rounded-full bg-white/5 p-1">
        {OPTIONS.map((option) => {
          const isActive = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`rounded-full px-3 py-1 transition ${
                isActive ? "bg-white text-slate-900" : "text-slate-300 hover:text-white"
              }`}
              aria-pressed={isActive}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
