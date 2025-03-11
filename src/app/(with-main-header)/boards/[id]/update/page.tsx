"use client";

import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import Input from "@/components/common/Input";
import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { boardApi } from "@/api/board/board";
import { userApi } from "@/api/user/user";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { revalidateTagAction } from "@/actions";
import Image from "next/image";

export default function BoardsUpdate() {
  const params = useParams();
  const router = useRouter();
  const boardId = Number(params.id);

  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [userId, setUserId] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  useEffect(() => {
    const checkAuthAndFetchBoard = async () => {
      try {
        const [userResponse, boardResponse] = await Promise.all([
          userApi.getCurrentUserInfo(),
          boardApi.getBoardByBoardId(boardId),
        ]);

        if (!boardResponse) {
          router.replace("/boards");
          return;
        }

        if (userResponse?.data.userId !== boardResponse?.data.userId) {
          alert("수정 권한이 없습니다.");
          router.replace(`/boards/${boardId}`);
          return;
        }

        setUserId(userResponse.data.userId);
        setTitle(boardResponse.data.title);
        setContext(boardResponse.data.context);
        setExistingImages(boardResponse.data.images);
      } catch (error) {
        console.error("게시글 정보를 불러오는데 실패:", error);
        router.replace("/boards");
      }
    };

    checkAuthAndFetchBoard();
  }, [boardId]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages([...images, ...Array.from(files)]);
    }
  };

  const updatePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    const contents = {
      title,
      context,
      deletedImages,
    };

    formData.append(
      "contents",
      new Blob([JSON.stringify(contents)], {
        type: "application/json",
      }),
    );

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await boardApi.updateBoard(boardId, formData);
      if (response) {
        revalidateTagAction(`myPost-update-${userId}`);
        router.push(`/boards/${boardId}`);
      }
    } catch (error) {
      console.error("게시글 수정 실패:", error);
    }
  };

  return (
    <form onSubmit={updatePost} className="flex flex-col gap-6 mx-5 lg:mx-0">
      <div className="flex justify-between items-center">
        <Button disabled>자유</Button>
        <Button>수정하기</Button>
      </div>
      <div className="border-b border-site-darkgray-02">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-transparent"
          placeholder="게시글 제목을 입력해주세요"
          required
        />
      </div>
      <textarea
        value={context}
        onChange={(e) => setContext(e.target.value)}
        className="min-h-50 bg-site-white-70 px-5 lg:px-6 py-5 resize-none"
        spellCheck="false"
        placeholder="본문 내용을 입력해주세요"
        required
      />
      <div className="flex gap-2.5 items-center">
        <label
          htmlFor="board-images"
          className="flex justify-center items-center w-25 lg:w-40 h-25 lg:h-40 bg-site-lightgray cursor-pointer"
        >
          <input
            id="board-images"
            type="file"
            className="hidden"
            onChange={handleImageUpload}
            multiple
          />
          <Icon MuiIcon={AddPhotoAlternateRoundedIcon} />
        </label>
        {existingImages.map((imageUrl, idx) => (
          <div key={idx} className="relative w-25 lg:w-40 h-25 lg:h-40">
            <Image
              src={imageUrl}
              alt={`기존 이미지 ${idx + 1}`}
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => {
                setDeletedImages([...deletedImages, imageUrl]);
                setExistingImages(
                  existingImages.filter((img) => img !== imageUrl),
                );
              }}
              className="absolute top-0.5 lg:top-1 right-0.5 lg:right-1 flex justify-center items-center w-6 lg:w-7 h-6 lg:h-7 bg-site-black-50 rounded-sm"
            >
              <Icon MuiIcon={CloseRoundedIcon} className="text-white" />
            </button>
          </div>
        ))}
        {images.map((file, idx) => (
          <div key={idx} className="relative w-25 lg:w-40 h-25 lg:h-40">
            <Image
              src={URL.createObjectURL(file)}
              alt={`새 이미지 ${idx + 1}`}
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => {
                setImages(images.filter((_, i) => i !== idx));
              }}
              className="absolute top-0.5 lg:top-1 right-0.5 lg:right-1 flex justify-center items-center w-6 lg:w-7 h-6 lg:h-7 bg-site-black-50 rounded-sm"
            >
              <Icon MuiIcon={CloseRoundedIcon} className="text-white" />
            </button>
          </div>
        ))}
      </div>
    </form>
  );
}
