import { todoApi } from "@/api/todo/todo";
import TodoItem from "./TodoItem";

export default async function TodoItems() {
  const todos = await todoApi.getTodos();
  return (
    <div className="px-3 py-3 bg-site-button rounded-lg flex flex-col gap-3">
      {todos?.data.length === 0 ? (
        <div className="flex justify-between px-2.5 lg:px-7 py-4 bg-site-white-100">
          <span className="text-site-darkgray-02">오늘 할 일이 없습니다</span>
        </div>
      ) : (
        todos?.data.map((todo) => <TodoItem key={todo.todoId} todo={todo} />)
      )}
    </div>
  );
}
