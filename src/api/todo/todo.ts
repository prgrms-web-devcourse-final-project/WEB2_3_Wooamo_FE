import { fetchCustom } from "../fetchCustom";

const addTodo = async (todo: string) => {
  try {
    const response = await fetchCustom.post(`/user/todo`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo }),
    });
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType<{ todoId: number }> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getTodos = async () => {
  try {
    const response = await fetchCustom.get(`/user/todo`, {
      next: { tags: ["todos"] },
    });
    if (response.status === 401) return null;
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType<todoType[]> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const deleteTodo = async (todoId: number) => {
  try {
    const response = await fetchCustom.delete(`/user/todo/${todoId}`);
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateTodo = async (todoId: number, todo: string, isChecked: boolean) => {
  try {
    const response = await fetchCustom.put(`/user/todo/${todoId}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo, isChecked }),
    });
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
