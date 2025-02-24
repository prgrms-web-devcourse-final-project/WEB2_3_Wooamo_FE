import { create } from "zustand";

interface TodoStore {
  todos: todoType[];
  setTodos: (todos: todoType[]) => void;
  addTodo: (todo: todoType) => void;
  deleteTodo: (todo: todoType) => void;
  updateTodo: (todo: todoType) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, todo],
    })),
  deleteTodo: (todo) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.todoId !== todo.todoId),
    })),
  updateTodo: (todo) =>
    set((state) => ({
      todos: state.todos.map((t) => (t.todoId === todo.todoId ? todo : t)),
    })),
}));
