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

export const boardApi = {
  getBoardList,
  getBoardByBoardId,
  getCommentsByBoardId,
};
