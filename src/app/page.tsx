import { TodoApp } from "@/components/todo";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.35), transparent 35%), radial-gradient(circle at 80% 0%, rgba(14,165,233,0.25), transparent 45%)",
        }}
      />
      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-16 sm:px-10">
        <header className="space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-cyan-200">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            Daily Momentum
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Build laser-focused momentum with a calm TODO list.
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Capture tasks, celebrate wins, and keep work lightweight. Everything is
            stored locally in your browser so you can stay productive without creating yet
            another account.
          </p>
        </header>
        <TodoApp />
      </main>
    </div>
  );
}
