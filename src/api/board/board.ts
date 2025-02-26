const getBoardList = async (page?: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/board?title=&page=${page}&size=10`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch board list");
    }

    const data: boardListResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching board list:", error);
    throw error;
  }
};

const getBoardByBoardId = async (
  boardId: number,
): Promise<boardDetailResponse | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/board/${boardId}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch board detail");
    }

    const data: boardDetailResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching board detail:", error);
    throw error;
  }
};

const getCommentsByBoardId = async (
  boardId: number,
): Promise<commentListResponse | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/board/${boardId}/comment`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch board comments");
    }

    const data: commentListResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

const createBoard = async (
  formData: FormData,
): Promise<createBoardResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/board`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error("Failed to create board");
    }

    const data: createBoardResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating board:", error);
    throw error;
  }
};

const updateBoard = async (
  boardId: number,
  formData: FormData,
): Promise<updateBoardResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/board/${boardId}`,
      {
        method: "PUT",
        body: formData,
      },
    );
    if (!response.ok) {
    }
    const data: updateBoardResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating board:", error);
    throw error;
  }
};

const deleteBoard = async (boardId: number): Promise<deleteBoardResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/board/${boardId}`,
      {
        method: "DELETE",
      },
    );
    if (!response.ok) {
      throw new Error("Failed to delete board");
    }
    const data: deleteBoardResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting board:", error);
    throw error;
  }
};

export const boardApi = {
  getBoardList,
  getBoardByBoardId,
  getCommentsByBoardId,
  createBoard,
  updateBoard,
  deleteBoard,
};
