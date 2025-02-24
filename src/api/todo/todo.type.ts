/* eslint-disable @typescript-eslint/no-unused-vars */
interface getTodosRes {
  status: "성공";
  data: todoType[];
}

interface todoType {
  todoId: number;
  todo: string;
  isChecked: boolean;
}

interface addTodoRes {
  status: statusType;
  data: {
    todoId: number;
  };
}
