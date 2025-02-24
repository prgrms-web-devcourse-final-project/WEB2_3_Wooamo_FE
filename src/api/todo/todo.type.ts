/* eslint-disable @typescript-eslint/no-unused-vars */
interface getTodosRes {
  status: statusType;
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
