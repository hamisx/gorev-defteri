import { useState } from "react";
import type { Todo } from "../interfaces/Todo";

interface Props {
  todo: Todo;
  index: number;
  onToggle: (id: string) => void;
  onUpdate: (id: string, title: string, description: string) => void;
  onDelete: (id: string) => void;
}

// Her görev kartının sol kenarı farklı renkte olur
const accents = [
  "border-violet-500",
  "border-fuchsia-500",
  "border-orange-400",
  "border-sky-500",
  "border-pink-500",
];

export default function TodoItem({ todo, index, onToggle, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const save = () => {
    if (!title.trim()) return;
    onUpdate(todo.id, title, description);
    setEditing(false);
  };

  const cancel = () => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditing(false);
  };

  // Düzenleme modu
  if (editing) {
    return (
      <li className="rounded-2xl border-l-8 border-amber-400 bg-amber-50 p-4 shadow-md ring-1 ring-amber-200">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Başlık"
          className="mb-2 w-full rounded-xl border-2 border-amber-200 bg-white px-3 py-2 focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label="Açıklama"
          rows={2}
          className="mb-3 w-full rounded-xl border-2 border-amber-200 bg-white px-3 py-2 focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100"
        />
        <div className="flex gap-2">
          <button
            onClick={save}
            disabled={!title.trim()}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-1.5 text-sm font-semibold text-white shadow hover:opacity-90 disabled:opacity-50"
          >
            Değişiklikleri kaydet
          </button>
          <button
            onClick={cancel}
            className="rounded-xl bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50"
          >
            Vazgeç
          </button>
        </div>
      </li>
    );
  }

  const border = todo.completed ? "border-emerald-400" : accents[index % accents.length];

  // Normal görünüm
  return (
    <li
      className={`flex items-start gap-3 rounded-2xl border-l-8 p-4 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg ${border} ${
        todo.completed ? "bg-emerald-50" : "bg-white"
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`${todo.title} görevini tamamlandı olarak işaretle`}
        className="mt-1.5 h-5 w-5 cursor-pointer accent-emerald-500"
      />

      <div className="min-w-0 flex-1">
        <p
          className={`break-words font-bold ${
            todo.completed ? "text-slate-400 line-through" : "text-slate-800"
          }`}
        >
          {todo.title}
        </p>
        {todo.description && (
          <p
            className={`mt-0.5 break-words text-sm ${
              todo.completed ? "text-slate-400 line-through" : "text-slate-600"
            }`}
          >
            {todo.description}
          </p>
        )}
        <p className="mt-1 text-xs text-slate-400">
          📅{" "}
          {new Date(todo.createdAt).toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="flex shrink-0 gap-2">
        <button
          onClick={() => setEditing(true)}
          className="rounded-xl bg-sky-100 px-3 py-1.5 text-sm font-semibold text-sky-700 transition hover:bg-sky-200"
        >
          ✏️ Düzenle
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="rounded-xl bg-rose-100 px-3 py-1.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-200"
        >
          🗑️ Sil
        </button>
      </div>
    </li>
  );
}
