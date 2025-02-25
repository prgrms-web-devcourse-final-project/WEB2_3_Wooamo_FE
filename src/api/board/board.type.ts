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
    totalElementes: number;
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
    totalElementes: number;
    totalPages: number;
    hasNext: boolean;
  };
}
