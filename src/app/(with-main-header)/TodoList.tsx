"use client";

import Button from "@/components/common/Button";
import TodoItem from "./TodoItem";
import Input from "@/components/common/Input";
import { FormEvent, useEffect, useState } from "react";
import { todoApi } from "@/api/todo/todo";
import { useTodoStore } from "@/store/todoStore";

export default function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const { setTodos, addTodo: addTodoAtStore } = useTodoStore((state) => state);

  const [todo, setTodo] = useState("");

  const addTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo) return;

    const res = await todoApi.addTodo(todo);
    if (res?.status === "성공") {
      addTodoAtStore({ todo, isChecked: false, todoId: res.data.todoId });
    }
    setTodo("");
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await todoApi.getTodos();
      if (res?.status === "성공") {
        setTodos(res.data);
      }
    };

    fetchTodos();
  }, [setTodos]);

  return (
    <section className="w-full lg:w-120 flex flex-col gap-4">
      <form onSubmit={addTodo} className="flex items-center w-full gap-2">
        <div className="flex w-full">
          <label htmlFor="todo-input" className="hidden">
            할 일 입력
          </label>
          <Input
            id="todo-input"
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="오늘 할 일을 입력해주세요"
          />
        </div>
        <Button className="min-w-fit">추가</Button>
      </form>
      <div className="px-3 py-3 bg-site-button rounded-lg flex flex-col gap-3">
        {todos.map((todo) => (
          <TodoItem key={todo.todoId} todo={todo} />
        ))}
      </div>
    </section>
  );
}
