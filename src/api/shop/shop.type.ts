interface CostumeType {
  costumeId: number;
  image: string;
  costumeName: string;
  point: number;
}

interface getCostumeListRes {
  status: statusType;
  data: {
    contents: CostumeType[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
  };
}
