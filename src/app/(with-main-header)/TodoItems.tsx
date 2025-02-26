import { todoApi } from "@/api/todo/todo";
import TodoItem from "./TodoItem";

export default async function TodoItems() {
  const todos = await todoApi.getTodos();
  return (
    <div className="px-3 py-3 bg-site-button rounded-lg flex flex-col gap-3">
      {todos?.data.map((todo) => <TodoItem key={todo.todoId} todo={todo} />)}
    </div>
  );
}
