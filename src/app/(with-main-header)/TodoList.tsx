import { Suspense } from "react";
import TodoItems from "./TodoItems";
import TodoListForm from "./TodoListForm";
import BasicSkeleton from "@/components/common/skeletons/BasicSkeleton";

export default async function TodoList() {
  return (
    <section className="w-full lg:w-120 flex flex-col gap-4">
      <TodoListForm />
      <Suspense fallback={<BasicSkeleton count={3} />}>
        <TodoItems />
      </Suspense>
    </section>
  );
}
