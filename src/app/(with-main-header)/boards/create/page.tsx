"use client";

import Icon from "@/components/common/Icon";
import PostImage from "../PostImage";
import Button from "@/components/common/Button";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import Input from "@/components/common/Input";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

export default function BoardsCreate() {
  return (
    <form className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Button type="button" className="w-34 justify-start">
          <span className="ml-10">자유</span>
          <Icon MuiIcon={ArrowDropDownRoundedIcon} />
        </Button>
        <Button onClick={() => console.log("작성 완료")}>작성하기</Button>
      </div>
      <div className="border-b border-site-darkgray-02">
        <Input
          required
          className="bg-transparent"
          placeholder="게시글 제목을 입력해주세요"
        />
      </div>
      <textarea
        className="min-h-50 bg-site-white-70 px-6 py-5 resize-none"
        spellCheck="false"
        placeholder="본문 내용을 입력해주세요"
      />
      <div className="flex gap-2.5 items-center">
        <label
          htmlFor="board-images"
          className="flex justify-center items-center w-40 h-40 bg-site-lightgray cursor-pointer"
        >
          <input id="board-images" type="file" className="hidden" />
          <Icon MuiIcon={AddPhotoAlternateRoundedIcon} />
        </label>
        {[1, 2].map((_, idx) => (
          <PostImage key={idx} />
        ))}
      </div>
    </form>
  );
}
