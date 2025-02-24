import { BoardListResponse, BoardDetailResponse } from "./board.type";

const getBoardList = async (): Promise<BoardListResponse | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/board?title=&page=1&size=10`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch board list");
    }

    const data: BoardListResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching board list:", error);
    throw error;
  }
};

const getBoardByBoardId = async (
  boardId: number,
): Promise<BoardDetailResponse | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/board/${boardId}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch board detail");
    }

    const data: BoardDetailResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching board detail:", error);
    throw error;
  }
};
export const boardApi = {
  getBoardList,
  getBoardByBoardId,
};
