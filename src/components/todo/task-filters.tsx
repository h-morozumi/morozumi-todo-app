"use client";

import { TaskFilter } from "./types";

const FILTERS: { id: TaskFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Done" },
];

interface TaskFiltersProps {
  value: TaskFilter;
  onChange: (filter: TaskFilter) => void;
}

export function TaskFilters({ value, onChange }: TaskFiltersProps) {
  return (
    <div className="inline-flex rounded-full border border-white/10 bg-slate-900/40 p-1 text-sm font-medium text-white/70">
      {FILTERS.map((filter) => {
        const isActive = filter.id === value;
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onChange(filter.id)}
            className={`rounded-full px-4 py-1.5 transition ${
              isActive
                ? "bg-white text-slate-900 shadow"
                : "hover:text-white"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
