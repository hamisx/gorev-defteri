import { useState } from "react";
import type { FormEvent } from "react";

interface Props {
  onAdd: (title: string, description: string) => void;
}

export default function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-2xl bg-white shadow-lg shadow-violet-200/60 ring-1 ring-violet-100"
    >
      <div className="h-2 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400" />
      <div className="p-5">
        <h2 className="mb-4 text-lg font-bold text-violet-700">✨ Yeni görev ekle</h2>

        <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="title">
          Başlık
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Örn: React dersini tekrar et"
          className="mb-3 w-full rounded-xl border-2 border-violet-100 bg-violet-50/40 px-3 py-2 focus:border-fuchsia-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-fuchsia-100"
        />

        <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="description">
          Açıklama (isteğe bağlı)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          placeholder="Kısa bir not yaz"
          className="mb-4 w-full rounded-xl border-2 border-violet-100 bg-violet-50/40 px-3 py-2 focus:border-fuchsia-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-fuchsia-100"
        />

        <button
          type="submit"
          disabled={!title.trim()}
          className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-2.5 font-semibold text-white shadow-md shadow-fuchsia-300/50 transition hover:scale-[1.03] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          Görev ekle
        </button>
      </div>
    </form>
  );
}
