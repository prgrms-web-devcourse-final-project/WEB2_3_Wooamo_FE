"use client";

import { addTodo } from "@/actions/todo";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useActionState, useState } from "react";

export default function TodoListForm() {
  const [_, action, isPending] = useActionState(addTodo, null);
  const [todo, setTodo] = useState("");
  return (
    <form action={action} className="flex items-center w-full gap-2">
      <div className="flex w-full">
        <label htmlFor="todo-input" className="hidden">
          할 일 입력
        </label>
        <Input
          id="todo-input"
          name="todo"
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="오늘 할 일을 입력해주세요"
        />
      </div>
      <Button disabled={isPending} className="min-w-fit">
        {isPending ? "추가 중..." : "추가"}
      </Button>
    </form>
  );
}
