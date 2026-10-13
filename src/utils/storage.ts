import type { Todo } from "../interfaces/Todo";

const KEY = "todos";

// LocalStorage'dan görevleri oku
export function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Todo[]) : [];
  } catch {
    return [];
  }
}

// Görevleri LocalStorage'a kaydet
export function saveTodos(todos: Todo[]): void {
  localStorage.setItem(KEY, JSON.stringify(todos));
}
