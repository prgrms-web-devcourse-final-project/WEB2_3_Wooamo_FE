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

interface commentItem {
  commentId: number;
  userId: number;
  nickname: string;
  profile: string;
  context: string;
  createdAt: string;
  isConfirm: boolean;
}

interface createBoardRequest {
  title: string;
  boardType: "질문" | "자유";
  context: string;
  images?: File[];
}

interface createBoardResponse {
  boardId: number;
}

interface updateBoardRequest {
  title: string;
  context: string;
  deletedImages?: string[];
  images?: File[];
}

interface updateBoardResponse {
  boardId: number;
}

interface createCommentRequest {
  context: string;
}
