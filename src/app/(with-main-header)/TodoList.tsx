import Button from "@/components/common/Button";
import TodoItem from "./TodoItem";

export default function TodoList() {
  return (
    <section className="w-120 flex flex-col gap-4">
      <div className="flex items-center w-full gap-2">
        <div className="flex w-full">
          <label htmlFor="todo-input" className="hidden">
            할 일 입력
          </label>
          <input
            id="todo-input"
            type="text"
            placeholder="오늘 할 일을 입력해주세요"
            className="w-full px-7 py-4 text-xl bg-site-white-100 rounded-full"
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
