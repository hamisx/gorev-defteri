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
      className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5"
    >
      <h2 className="mb-4 text-lg font-semibold">Yeni görev ekle</h2>

      <label className="mb-1 block text-sm font-medium" htmlFor="title">
        Başlık
      </label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Örn: React dersini tekrar et"
        className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
      />

      <label className="mb-1 block text-sm font-medium" htmlFor="description">
        Açıklama (isteğe bağlı)
      </label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        placeholder="Kısa bir not yaz"
        className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
      />

      <button
        type="submit"
        disabled={!title.trim()}
        className="rounded-lg bg-brand px-5 py-2 font-medium text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        Görev ekle
      </button>
    </form>
  );
}
