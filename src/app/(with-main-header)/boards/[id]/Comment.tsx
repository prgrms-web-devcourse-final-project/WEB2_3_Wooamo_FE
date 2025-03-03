import Avatar from "@/components/common/Avatar";
import Link from "next/link";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Button from "@/components/common/Button";
import Dropdown from "@/components/common/Dropdown";
import Icon from "@/components/common/Icon";
import { useState, useEffect } from "react";
import { boardApi } from "@/api/board/board";
import { userApi } from "@/api/user/user";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

type CommentProps = {
  data: commentItem;
  onDelete: () => void;
  boardInfo?: boardDetail;
};

export default function Comment({ data, onDelete, boardInfo }: CommentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCommentAuthor, setIsCommentAuthor] = useState(false);
  const [isBoardAuthor, setIsBoardAuthor] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(data.isConfirm);

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const currentUser = await userApi.getCurrentUserInfo();
        if (currentUser?.data) {
          setIsCommentAuthor(currentUser.data.userId === data.userId);
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

  const isSelectableComment =
    !isCommentAuthor &&
    isBoardAuthor &&
    boardInfo?.boardType === "질문" &&
    !boardInfo?.isConfirm;

  return (
    <article
      className={`flex gap-2.5 group ${
        isSelectableComment && "hover:bg-site-white-70 rounded-4xl"
      }`}
    >
      <Link href={`/users/${data.userId}`}>
        <Avatar
          costumeSrc={data.profile}
          className="w-11 lg:w-14 h-11 lg:h-14"
        />
      </Link>

      <div className="flex flex-col lg:gap-1 flex-grow">
        <div className="flex justify-between items-center">
          <div className="w-fit">
            <Link
              href={`/users/${data.userId}`}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-semibold lg:text-xl">@{data.nickname}</p>
            </Link>
            <p className="text-site-darkgray-02 text-sm lg:text-base">
              {data.context}
            </p>
          </div>

          <div className="relative">
            {isConfirmed && (
              <Button
                className="bg-transparent  px-0 lg:px-0 mr-5 lg:mr-6"
                disabled
              >
                <Icon MuiIcon={CheckRoundedIcon} className="text-site-main" />
              </Button>
            )}

            {!isConfirmed && isCommentAuthor && (
              <>
                <Button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="bg-transparent px-0 lg:px-0 mr-5 lg:mr-6 "
                >
                  <Icon MuiIcon={MoreHorizRoundedIcon} />
                </Button>
                {isOpen && (
                  <Dropdown onClose={() => setIsOpen(false)}>
                    <Button
                      onClick={handleDelete}
                      className="w-full"
                      disabled={isDeleting}
                    >
                      삭제
                    </Button>
                  </Dropdown>
                )}
              </>
            )}
            {!isConfirmed && isSelectableComment && (
              <Button
                onClick={handleSelect}
                className="bg-site-button hidden group-hover:block"
              >
                채택
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
