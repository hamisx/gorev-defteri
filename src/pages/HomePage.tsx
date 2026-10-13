import { useState } from "react";
import type { Filter } from "../interfaces/Todo";
import { useTodos } from "../hooks/useTodos";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import FilterBar from "../components/FilterBar";

export default function HomePage() {
  const { todos, addTodo, updateTodo, toggleTodo, deleteTodo, clearCompleted } =
    useTodos();
  const [filter, setFilter] = useState<Filter>("all");

  const counts: Record<Filter, number> = {
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  const percent = counts.all === 0 ? 0 : Math.round((counts.completed / counts.all) * 100);

  const visible = todos.filter((t) =>
    filter === "all" ? true : filter === "active" ? !t.completed : t.completed
  );

  const emptyMessage =
    todos.length === 0
      ? "Henüz görev yok. Yukarıdaki formdan ilk görevini ekle."
      : "Bu filtrede görev bulunamadı.";

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Renkli üst banner */}
      <header className="mb-6 rounded-3xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 p-6 text-white shadow-xl shadow-fuchsia-300/50">
        <h1 className="text-3xl font-extrabold tracking-tight">📒 Görev Defteri</h1>
        <p className="mt-1 text-white/90">
          Yapılacaklarını ekle, düzenle, tamamla ve sil.
        </p>

        <div className="mt-5 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl bg-white/20 py-3 backdrop-blur">
            <p className="text-2xl font-bold">{counts.all}</p>
            <p className="text-xs font-medium text-white/90">Toplam</p>
          </div>
          <div className="rounded-2xl bg-white/20 py-3 backdrop-blur">
            <p className="text-2xl font-bold">{counts.active}</p>
            <p className="text-xs font-medium text-white/90">Devam eden</p>
          </div>
          <div className="rounded-2xl bg-white/20 py-3 backdrop-blur">
            <p className="text-2xl font-bold">{counts.completed}</p>
            <p className="text-xs font-medium text-white/90">Tamamlanan</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs font-medium">
            <span>İlerleme</span>
            <span>%{percent}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/30">
            <div
              className="h-full rounded-full bg-white transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </header>

      <TodoForm onAdd={addTodo} />

      <section className="mt-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-violet-700">📋 Görevlerim</h2>
          <FilterBar filter={filter} onChange={setFilter} counts={counts} />
        </div>

        <TodoList
          todos={visible}
          emptyMessage={emptyMessage}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />

        {counts.completed > 0 && (
          <button
            onClick={clearCompleted}
            className="mt-4 text-sm font-semibold text-rose-600 hover:underline"
          >
            Tamamlananları temizle
          </button>
        )}
      </section>

      <footer className="mt-12 text-center text-xs text-slate-500">
        Veriler tarayıcıdaki LocalStorage'da saklanır. React + TypeScript + Tailwind CSS
      </footer>
    </div>
  );
}
