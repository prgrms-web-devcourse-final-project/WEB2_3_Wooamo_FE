"use client";

import Icon from "@/components/common/Icon";
import Button from "@/components/common/Button";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import Input from "@/components/common/Input";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { FormEvent, useState, useRef } from "react";
import Dropdown from "@/components/common/Dropdown";
import { boardApi } from "@/api/board/board";
import { useRouter } from "next/navigation";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { userApi } from "@/api/user/user";
import { revalidateTagAction } from "@/actions";

export default function BoardsCreate() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBoardType, setSelectedBoardType] = useState("자유");
  const [images, setImages] = useState<File[]>([]);
  const [context, setContext] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages((prevImages) => [
        ...prevImages,
        ...Array.from(e.target.files!),
      ]);
    }
  };

  const handleDeleteImage = (indexToDelete: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToDelete),
    );

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const createPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await userApi.getCurrentUserInfo();
      if (!user) return;

      const formData = new FormData();
      const contents = {
        title,
        context,
        boardType: selectedBoardType as "질문" | "자유",
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

      const response = await boardApi.createBoard(formData);

      console.log("Created board response:", response);
      console.log("New board ID:", response.data?.boardId);

      if (response.status === "성공") {
        revalidateTagAction(`myPost-create-${user.data.userId}`);
        router.push(`/boards/${response.data?.boardId}`);
      }
    } catch (error) {
      console.error("게시글 작성 실패:", error);
    }
  };

  const handleTypeSelect = (type: string) => {
    setSelectedBoardType(type);
    setIsOpen(false);
  };

  return (
    <form onSubmit={createPost} className="flex flex-col gap-6 px-5 lg:px-0">
      <div className="relative flex justify-between items-center">
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }}
          className="flex items-center"
        >
          <span className="ml-2.5">{selectedBoardType}</span>
          <Icon MuiIcon={ArrowDropDownRoundedIcon} />
        </Button>

        {isOpen && (
          <Dropdown
            onClose={() => setIsOpen(false)}
            className="top-0 left-0 lg:mt-6"
          >
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleTypeSelect("자유");
              }}
            >
              자유
            </Button>
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleTypeSelect("질문");
              }}
            >
              질문
            </Button>
          </Dropdown>
        )}

        <Button>작성하기</Button>
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
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
          <Icon MuiIcon={AddPhotoAlternateRoundedIcon} />
        </label>
        {images.length > 0 && (
          <div className="flex gap-2.5">
            {images.map((image, idx) => (
              <div
                key={idx}
                className="w-25 lg:w-40 h-25 lg:h-40 bg-site-lightgray relative"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${idx}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteImage(idx);
                  }}
                  className="absolute top-0.5 lg:top-1 right-0.5 lg:right-1 flex justify-center items-center w-6 lg:w-7 h-6 lg:h-7 bg-site-black-50 rounded-sm"
                >
                  <Icon MuiIcon={CloseRoundedIcon} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}
