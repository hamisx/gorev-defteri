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

  const visible = todos.filter((t) =>
    filter === "all" ? true : filter === "active" ? !t.completed : t.completed
  );

  const emptyMessage =
    todos.length === 0
      ? "Henüz görev yok. Yukarıdaki formdan ilk görevini ekle."
      : "Bu filtrede görev bulunamadı.";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Görev Defteri</h1>
        <p className="mt-1 text-gray-600">
          Yapılacaklarını ekle, düzenle, tamamla ve sil.
        </p>
      </header>

      <TodoForm onAdd={addTodo} />

      <section className="mt-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Görevlerim</h2>
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
            className="mt-4 text-sm font-medium text-red-700 hover:underline"
          >
            Tamamlananları temizle
          </button>
        )}
      </section>

      <footer className="mt-12 text-center text-xs text-gray-400">
        Veriler tarayıcıdaki LocalStorage'da saklanır. React + TypeScript + Tailwind CSS
      </footer>
    </div>
  );
}
