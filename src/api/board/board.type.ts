export interface BoardItem {
  boardId: number;
  title: string;
  boardType: "질문" | "자유";
  createdAt: string;
  isConfirm: boolean;
  image: string | null;
}

export interface BoardListResponse {
  status: string;
  data: {
    contents: BoardItem[];
    page: number;
    size: number;
    totalElementes: number;
    totalPages: number;
    hasNext: boolean;
  };
}

export interface BoardDetail {
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

export interface BoardDetailResponse {
  status: string;
  data: BoardDetail;
}
