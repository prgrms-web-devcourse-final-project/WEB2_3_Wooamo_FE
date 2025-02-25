interface boardItem {
  boardId: number;
  title: string;
  boardType: "질문" | "자유";
  createdAt: string;
  isConfirm: boolean;
  image: string | null;
}
interface boardListResponse {
  status: string;
  data: {
    contents: boardItem[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
  };
}

interface boardDetail {
  title: string;
  userId: number;
  nickname: string;
  profile: string;
  boardType: "질문" | "자유";
  createdAt: string;
  isConfirm: boolean;
  context: string;
  images: string[];
}

interface boardDetailResponse {
  status: string;
  data: boardDetail;
}

interface commentItem {
  commentId: number;
  userId: number;
  nickname: string;
  profile: string;
  context: string;
  createdAt: string;
  isConfirm: boolean;
}

interface commentListResponse {
  status: string;
  data: {
    contents: commentItem[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
  };
}

interface createBoardRequest {
  title: string;
  boardType: "질문" | "자유";
  context: string;
  images?: File[];
}

interface createBoardResponse {
  status: string;
  data: {
    boardId: number;
  };
}

interface BoardAPI {
  getBoardList: (page?: number) => Promise<boardListResponse>;
  getBoardByBoardId: (
    boardId: number,
  ) => Promise<boardDetailResponse | undefined>;
  getCommentsByBoardId: (
    boardId: number,
  ) => Promise<commentListResponse | undefined>;
  createBoard: (formData: FormData) => Promise<createBoardResponse>;
}
