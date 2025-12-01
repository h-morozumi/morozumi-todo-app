"use client";

interface TaskSummaryProps {
  total: number;
  active: number;
  completed: number;
  high: number;
  medium: number;
  low: number;
}

export function TaskSummary({ total, active, completed, high, medium, low }: TaskSummaryProps) {
  const completion = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-inner shadow-black/20">
      <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
        <span className="text-base font-semibold text-white">
          {active === 0 ? "Focus on growth" : "Stay on track"}
        </span>
        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wide text-slate-400">
          <span>All: {total}</span>
          <span>Active: {active}</span>
          <span>Done: {completed}</span>
          <span className="text-rose-200">High: {high}</span>
          <span className="text-amber-200">Med: {medium}</span>
          <span className="text-emerald-200">Low: {low}</span>
        </div>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-300">
          <span>Progress</span>
          <span>{completion}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-[width]"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>
    </div>
  );
}
