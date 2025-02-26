import Avatar from "@/components/common/Avatar";
import Link from "next/link";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Button from "@/components/common/Button";
import Dropdown from "@/components/common/Dropdown";
import Icon from "@/components/common/Icon";
import { useState, useEffect } from "react";
import { boardApi } from "@/api/board/board";
import { userApi } from "@/api/user/user";

type CommentProps = {
  data: commentItem;
  onDelete: () => void;
  boardInfo?: boardDetail;
};

export default function Comment({ data, onDelete, boardInfo }: CommentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isBoardAuthor, setIsBoardAuthor] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(data.isConfirm);

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const currentUser = await userApi.getCurrentUserInfo();
        if (currentUser?.data) {
          setIsCurrentUser(currentUser.data.userId === data.userId);
          setIsBoardAuthor(currentUser.data.userId === boardInfo?.userId);
        }
      } catch (error) {
        console.error("사용자 정보 확인 실패:", error);
      }
    };

    checkCurrentUser();
  }, [data.userId, boardInfo?.userId]);

  const handleDelete = async () => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      await boardApi.deleteComment(data.commentId);
      onDelete();
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  const handleSelect = async () => {
    try {
      await boardApi.selectComment(data.commentId);
      setIsConfirmed(true);
      setIsOpen(false);
    } catch (error) {
      console.error("Error selecting comment:", error);
    }
  };

  return (
    <article className="flex gap-2.5">
      <Link href={`/users/${data.userId}`}>
        <Avatar
          costumeSrc={data.profile}
          className="w-11 lg:w-14 h-11 lg:h-14"
        />
      </Link>

      <div className="flex flex-col lg:gap-1 flex-grow">
        <div className="flex justify-between items-center">
          <Link href={`/users/${data.userId}`} className="w-fit">
            <p className="font-semibold lg:text-xl">@{data.nickname}</p>
            <p className="text-site-darkgray-02 text-sm lg:text-base">
              {data.context}
            </p>
          </Link>

          <div className="relative">
            {(isCurrentUser ||
              (isBoardAuthor &&
                boardInfo?.boardType === "질문" &&
                !isCurrentUser)) && (
              <>
                {isBoardAuthor &&
                boardInfo?.boardType === "질문" &&
                !isCurrentUser ? (
                  isConfirmed ? (
                    <Button
                      className="bg-transparent px-0 lg:px-0 text-site-primary cursor-default"
                      disabled
                    >
                      채택됨
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setIsOpen((prev) => !prev)}
                      className="bg-transparent px-0 lg:px-0"
                    >
                      <Icon MuiIcon={MoreHorizRoundedIcon} />
                    </Button>
                  )
                ) : (
                  <Button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="bg-transparent px-0 lg:px-0"
                  >
                    <Icon MuiIcon={MoreHorizRoundedIcon} />
                  </Button>
                )}
              </>
            )}
            {isOpen && (
              <Dropdown
                onClose={() => {
                  setIsOpen(false);
                }}
              >
                {isCurrentUser ? (
                  <Button
                    onClick={handleDelete}
                    className="w-full"
                    disabled={isDeleting}
                  >
                    삭제
                  </Button>
                ) : (
                  isBoardAuthor &&
                  boardInfo?.boardType === "질문" && (
                    <Button onClick={() => {}} className="w-full">
                      채택
                    </Button>
                  )
                )}
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
