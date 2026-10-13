import type { Todo } from "../interfaces/Todo";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  emptyMessage: string;
  onToggle: (id: string) => void;
  onUpdate: (id: string, title: string, description: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, emptyMessage, ...handlers }: Props) {
  if (todos.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} {...handlers} />
      ))}
    </ul>
  );
}
