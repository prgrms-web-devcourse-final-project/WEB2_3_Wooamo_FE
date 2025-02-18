"use client";

import Icon from "@/components/common/Icon";
import Image from "next/image";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AvatarImg from "@/assets/images/avatar.png";

export default function PostImage() {
  return (
    <div
      onClick={() => console.log("큰 화면으로 보기")}
      className="w-40 h-40 bg-site-white-100 relative cursor-pointer"
    >
      <Image
        src={AvatarImg}
        alt="게시글 미리보기 이미지"
        className="object-contain"
        sizes="100%"
        fill
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          console.log("이미지 삭제");
        }}
        className="absolute top-1 right-1 flex justify-center items-center w-7 h-7 bg-site-black-50 rounded-sm"
      >
        <Icon MuiIcon={CloseRoundedIcon} className="text-white" />
      </button>
    </div>
  );
}
