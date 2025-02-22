"use client";

import Button from "@/components/common/Button";
import TodoItem from "./TodoItem";
import Input from "@/components/common/Input";
import { useState } from "react";

export default function TodoList() {
  const [todo, setTodo] = useState("");

  return (
    <section className="w-full lg:w-120 flex flex-col gap-4">
      <div className="flex items-center w-full gap-2">
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
      </div>
      <div className="px-3 py-3 bg-site-button rounded-lg flex flex-col gap-3">
        {new Array(4).fill(0).map((_, idx) => (
          <TodoItem key={idx} />
        ))}
      </div>
    </section>
  );
}
