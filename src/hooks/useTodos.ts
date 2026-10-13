import { useEffect, useState } from "react";
import type { Todo } from "../interfaces/Todo";
import { loadTodos, saveTodos } from "../utils/storage";

// Tüm CRUD işlemleri bu hook içinde
export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());

  // todos her değiştiğinde LocalStorage'a yaz
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // CREATE - Ekle
  const addTodo = (title: string, description: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  // UPDATE - Güncelle (başlık ve açıklama)
  const updateTodo = (id: string, title: string, description: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, title: title.trim(), description: description.trim() } : t
      )
    );
  };

  // UPDATE - Tamamlandı / Tamamlanmadı
  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // DELETE - Sil
  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // Tamamlananları toplu sil
  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  return { todos, addTodo, updateTodo, toggleTodo, deleteTodo, clearCompleted };
}
