import type { Filter } from "../interfaces/Todo";

interface Props {
  filter: Filter;
  onChange: (f: Filter) => void;
  counts: Record<Filter, number>;
}

const options: { value: Filter; label: string }[] = [
  { value: "all", label: "Tümü" },
  { value: "active", label: "Devam eden" },
  { value: "completed", label: "Tamamlanan" },
];

export default function FilterBar({ filter, onChange, counts }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          aria-pressed={filter === o.value}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            filter === o.value
              ? "bg-brand text-white"
              : "bg-white text-gray-700 ring-1 ring-black/10 hover:bg-gray-50"
          }`}
        >
          {o.label} ({counts[o.value]})
        </button>
      ))}
    </div>
  );
}
