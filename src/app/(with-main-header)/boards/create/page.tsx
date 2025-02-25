"use client";

import Icon from "@/components/common/Icon";
import PostImage from "../PostImage";
import Button from "@/components/common/Button";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import Input from "@/components/common/Input";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { FormEvent, useState } from "react";
import Dropdown from "@/components/common/Dropdown";

export default function BoardsCreate() {
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBoardType, setSelectedBoardType] = useState("자유");

  const createPost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("게시글 작성");
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
          <input id="board-images" type="file" className="hidden" />
          <Icon MuiIcon={AddPhotoAlternateRoundedIcon} />
        </label>
        {/* {[1, 2].map((_, idx) => (
          <PostImage key={idx} />
        ))} */}
      </div>
    </form>
  );
}
