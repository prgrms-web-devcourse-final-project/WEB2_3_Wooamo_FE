/* eslint-disable @typescript-eslint/no-unused-vars */
interface boardItem {
  boardId: number;
  title: string;
  context: string;
  boardType: "질문" | "자유";
  createdAt: string;
  isConfirm: boolean;
  image: string | null;
}
interface boardListResponse {
  status: statusType;
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
  status: statusType;
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
  status: statusType;
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
  status: statusType;
  data: {
    boardId: number;
  };
}

interface updateBoardRequest {
  title: string;
  context: string;
  deletedImages?: string[];
  images?: File[];
}

interface updateBoardResponse {
  status: statusType;
  data: {
    boardId: number;
  };
}

interface deleteBoardResponse {
  status: statusType;
}

interface createCommentRequest {
  context: string;
}

interface createCommentResponse {
  status: statusType;
}

interface deleteCommentResponse {
  status: statusType;
}

interface selectCommentResponse {
  status: statusType;
}
