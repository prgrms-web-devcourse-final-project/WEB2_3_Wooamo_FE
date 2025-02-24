import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Icon from "@/components/common/Icon";
import Button from "@/components/common/Button";
import { useState } from "react";
import Dropdown from "@/components/common/Dropdown";
import { useTodoStore } from "@/store/todoStore";
import { todoApi } from "@/api/todo/todo";
import { twMerge } from "tailwind-merge";

export default function TodoItem({ todo }: { todo: todoType }) {
  const { updateTodo: updateTodoAtStore, deleteTodo: deleteTodoAtStore } =
    useTodoStore((state) => state);

  const [isTodoChecked, setIsTodoChecked] = useState(todo.isChecked);
  const [isEditable, setIsEditable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo.todo);

  const updateTodo = async (todo: todoType) => {
    const res = await todoApi.updateTodo(1, todo.todo);
    if (res?.status === "성공") {
      setIsEditable(false);
      updateTodoAtStore(todo);
    }
  };

  const deleteTodo = async () => {
    const res = await todoApi.deleteTodo(1);
    if (res?.status === "성공") {
      deleteTodoAtStore(todo);
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
          onChange={() => setIsTodoChecked((prev) => !prev)}
          className="appearance-none w-6 h-6 bg-site-button rounded-[3px]"
        />
        {isTodoChecked && (
          <CheckRoundedIcon className="absolute pointer-events-none" />
        )}
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
              "text-xl",
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
