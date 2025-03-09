"use client";

import dynamic from "next/dynamic";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Button from "@/components/common/Button";
import { useState } from "react";
import Dropdown from "@/components/common/Dropdown";
import { todoApi } from "@/api/todo/todo";
import { twMerge } from "tailwind-merge";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { revalidateTagAction } from "../../actions";

const Icon = dynamic(() => import("@/components/common/Icon"), { ssr: false });

export default function TodoItem({ todo }: { todo: todoType }) {
  const [isTodoChecked, setIsTodoChecked] = useState(todo.isChecked);
  const [isEditable, setIsEditable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo.todo);

  const checkTodo = async () => {
    const res = await todoApi.updateTodo(
      todo.todoId,
      todo.todo,
      !isTodoChecked,
    );
    if (res?.status === "성공") {
      setIsTodoChecked((prev) => !prev);
    }
  };

  const updateTodo = async (todo: todoType) => {
    const res = await todoApi.updateTodo(todo.todoId, todo.todo, isTodoChecked);
    if (res?.status === "성공") {
      setIsEditable(false);
    }
  };

  const deleteTodo = async () => {
    const res = await todoApi.deleteTodo(todo.todoId);
    if (res?.status === "성공") {
      revalidateTagAction("todos");
    }
    setIsOpen(false);
  };

  return (
    <div className="flex justify-between px-2.5 lg:px-7 py-4 bg-site-white-100">
      <div className="flex gap-3 items-center relative">
        <input
          id={`todo-checkbox-${todo.todo}`}
          type="checkbox"
          checked={isTodoChecked}
          onChange={checkTodo}
          className="appearance-none min-w-6 lg:min-w-7 h-6 lg:h-7 bg-site-button rounded-[3px] cursor-pointer"
        />

        <Icon
          MuiIcon={CheckRoundedIcon}
          className={twMerge(
            "absolute pointer-events-none",
            isTodoChecked ? "visible" : "invisible",
          )}
        />

        {isEditable ? (
          <input
            type="text"
            value={editedTodo}
            onChange={(e) => setEditedTodo(e.target.value)}
            className="text-xl border-2"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                updateTodo({
                  todoId: todo.todoId,
                  todo: editedTodo,
                  isChecked: isTodoChecked,
                });
              }
            }}
          />
        ) : (
          <label
            htmlFor={`todo-checkbox-${todo.todo}`}
            className={twMerge(
              "text-xl select-none cursor-pointer",
              isTodoChecked && "line-through opacity-50",
            )}
          >
            {editedTodo}
          </label>
        )}
      </div>

      <div className="relative">
        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-transparent lg:px-0"
        >
          <Icon MuiIcon={MoreHorizRoundedIcon} />
        </Button>
        {isOpen && (
          <Dropdown onClose={() => setIsOpen(false)}>
            <Button
              onClick={() => {
                setIsEditable(true);
                setIsOpen(false);
              }}
              className="w-full"
            >
              수정
            </Button>
            <Button onClick={deleteTodo} className="w-full">
              삭제
            </Button>
          </Dropdown>
        )}
      </div>
    </div>
  );
}
