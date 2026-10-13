import { useState } from "react";
import type { Todo } from "../interfaces/Todo";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, title: string, description: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }: Props) {
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
      <li className="rounded-2xl bg-white p-4 shadow-sm ring-2 ring-brand/40">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Başlık"
          className="mb-2 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label="Açıklama"
          rows={2}
          className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
        <div className="flex gap-2">
          <button
            onClick={save}
            disabled={!title.trim()}
            className="rounded-lg bg-brand px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-50"
          >
            Değişiklikleri kaydet
          </button>
          <button
            onClick={cancel}
            className="rounded-lg border border-gray-300 px-4 py-1.5 text-sm font-medium hover:bg-gray-50"
          >
            Vazgeç
          </button>
        </div>
      </li>
    );
  }

  // Normal görünüm
  return (
    <li className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`${todo.title} görevini tamamlandı olarak işaretle`}
        className="mt-1.5 h-5 w-5 cursor-pointer accent-teal-700"
      />

      <div className="min-w-0 flex-1">
        <p
          className={`break-words font-semibold ${
            todo.completed ? "text-gray-400 line-through" : ""
          }`}
        >
          {todo.title}
        </p>
        {todo.description && (
          <p
            className={`mt-0.5 break-words text-sm ${
              todo.completed ? "text-gray-400 line-through" : "text-gray-600"
            }`}
          >
            {todo.description}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-400">
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
          className="rounded-lg bg-brand-soft px-3 py-1.5 text-sm font-medium text-brand-dark hover:bg-teal-200"
        >
          Düzenle
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100"
        >
          Sil
        </button>
      </div>
    </li>
  );
}
