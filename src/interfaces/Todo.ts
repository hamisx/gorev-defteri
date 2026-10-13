// Görev (Todo) veri tipi
export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

// Filtre seçenekleri
export type Filter = "all" | "active" | "completed";
