import { fetchCustom } from "../fetchCustom";

const getBoardList = async (title?: string, page?: number, size?: number) => {
  try {
    const response = await fetchCustom.get(
      `/board?title=${title ?? ""}&page=${page ?? 0}&size=${size ?? 10}`,
      {
        cache: "no-store",
        isTokenExclude: true,
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Response status:", response.status);
      console.error("Error data:", errorData);
      throw new Error(
        `Failed to fetch board list: ${response.status} ${response.statusText}`,
      );
    }

    const data: paginationType<boardItem[]> = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching board list:", error);
    throw error;
  }
};

const getBoardByBoardId = async (boardId: number) => {
  try {
    const response = await fetchCustom.get(`/board/${boardId}`, {
      isTokenExclude: true,
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data: responseType<boardDetail> = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching board detail:", error);
    return null;
  }
};

const getCommentsByBoardId = async (boardId: number) => {
  try {
    const response = await fetchCustom.get(`/board/${boardId}/comment`, {
      isTokenExclude: true,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch board comments");
    }

    const data: responseType<commentItem[]> = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

const createBoard = async (formData: FormData) => {
  try {
    const response = await fetchCustom.post(`/board`, {
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to create board");
    }

    const data: responseType<createBoardResponse> = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating board:", error);
    throw error;
  }
};

const updateBoard = async (boardId: number, formData: FormData) => {
  try {
    const response = await fetchCustom.put(`/board/${boardId}`, {
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Response status:", response.status);
      console.error("Error data:", errorData);
      throw new Error(
        `Failed to update board: ${response.status} ${response.statusText}`,
      );
    }
    const data: responseType<updateBoardResponse> = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating board:", error);
    throw error;
  }
};

const deleteBoard = async (boardId: number) => {
  try {
    const response = await fetchCustom.delete(`/board/${boardId}`);
    if (!response.ok) {
      throw new Error("Failed to delete board");
    }
    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting board:", error);
    throw error;
  }
};

const createComment = async (boardId: number, data: createCommentRequest) => {
  try {
    const response = await fetchCustom.post(`/board/${boardId}/comment`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create comment");
    }

    const responseData: responseType = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

const deleteComment = async (commentId: number) => {
  try {
    const response = await fetchCustom.delete(`/board/comment/${commentId}`);

    if (!response.ok) {
      throw new Error("Failed to delete comment");
    }
    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

const selectComment = async (commentId: number) => {
  try {
    const response = await fetchCustom.patch(`/board/comment/${commentId}`);

    if (!response.ok) {
      throw new Error("Failed to select comment");
    }

    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error("Error selecting comment:", error);
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
  createComment,
  deleteComment,
  selectComment,
};
