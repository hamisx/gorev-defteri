import type { Filter } from "../interfaces/Todo";

interface Props {
  filter: Filter;
  onChange: (f: Filter) => void;
  counts: Record<Filter, number>;
}

const options: { value: Filter; label: string; active: string }[] = [
  { value: "all", label: "Tümü", active: "from-violet-600 to-fuchsia-500" },
  { value: "active", label: "Devam eden", active: "from-orange-500 to-amber-400" },
  { value: "completed", label: "Tamamlanan", active: "from-emerald-500 to-teal-400" },
];

export default function FilterBar({ filter, onChange, counts }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          aria-pressed={filter === o.value}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
            filter === o.value
              ? `bg-gradient-to-r ${o.active} text-white shadow-md`
              : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-violet-50"
          }`}
        >
          {o.label} ({counts[o.value]})
        </button>
      ))}
    </div>
  );
}
