const addTodo = async (todo: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/todo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo }),
      },
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: addTodoRes = await response.json();
    if (data.status === "성공") {
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getTodos = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/todo`,
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: getTodosRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const deleteTodo = async (todoId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/todo/${todoId}`,
      {
        method: "DELETE",
      },
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateTodo = async (todoId: number, todo: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/todo/${todoId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo }),
      },
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const todoApi = {
  addTodo,
  getTodos,
  deleteTodo,
  updateTodo,
};
