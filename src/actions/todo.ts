"use server";

import { todoApi } from "@/api/todo/todo";
import { revalidateTag } from "next/cache";

export const addTodo = async (state: unknown, formData: FormData) => {
  const todo = formData.get("todo")?.toString();
  if (!todo) return;

  const res = await todoApi.addTodo(todo);
  if (res?.status === "성공") {
    revalidateTag("todos");
  }
};
