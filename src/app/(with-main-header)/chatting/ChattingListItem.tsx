import Avatar from "@/components/common/Avatar";
import Link from "next/link";
import formatDateToTimeAgo from "@/utils/formatDateToTimeAgo";
import Image from "next/image";

interface ChattingListItemProps {
  roomId: string;
  roomType: string;
  roomName: string;
  lastMessage: string;
  unreadCount: number;
  createdAt: string;
  lastUserInfo: userType | null;
  userInfo: userType | null;
  groupInfo: groupType | null;
}

// 친구 채팅인지 팟 채팅인지 확인 후 라우팅 및 name 처리 해주시면 됩니다!
export default function ChattingListItem({
  roomId,
  roomType,
  lastMessage,
  unreadCount,
  userInfo,
  groupInfo,
  createdAt,
}: ChattingListItemProps) {
  const isPrivateChat = roomType === "PRIVATE";

  const modifiedCreatedAt = createdAt.startsWith("+")
    ? ""
    : formatDateToTimeAgo(new Date(createdAt));
  return (
    <Link
      href={
        isPrivateChat
          ? `/chatting/friend/${userInfo?.userId}?roomId=${roomId}`
          : `chatting/party/${groupInfo?.groupId}?roomId=${roomId}`
      }
    >
      <article
        className={`h-20 lg:h-25 px-5 lg:px-8 flex justify-between items-center ${
          unreadCount > 0 ? "bg-site-white-50" : ""
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div>
            {isPrivateChat ? (
              <Avatar
                className="w-11 lg:w-15 h-11 lg:h-15"
                costumeSrc={userInfo?.profile ?? ""}
              />
            ) : (
              <Image
                className="w-11 lg:w-15 h-11 lg:h-15 rounded-full bg-site-profile"
                width={97}
                height={45}
                src={"/images/Logo.svg"}
                alt="로고 이미지"
              />
            )}
          </div>
          <div className="flex flex-col gap-0 lg:gap-1">
            <div>
              <span className="font-semibold text-lg lg:text-xl">
                {isPrivateChat ? (
                  <span>@{userInfo?.nickname}</span>
                ) : (
                  <>
                    <span>{groupInfo?.groupName}</span>
                    <span className="text-site-darkgray-02 ml-3">
                      {groupInfo?.totalMembers}
                    </span>
                  </>
                )}
              </span>
            </div>
            <div className="flex gap-3 text-sm lg:text-base">
              <span className="text-site-darkgray-02 line-clamp-1">
                {lastMessage}
              </span>
              <span className="min-w-fit text-site-darkgray-01">
                {modifiedCreatedAt}
              </span>
            </div>
          </div>
        </div>
        {unreadCount > 0 && (
          <div className="bg-site-alarm px-3 lg:px-4 py-0.5 lg:py-1.5 text-white rounded-full">
            <span className="text-sm lg:text-base">{unreadCount}</span>
          </div>
        )}
      </article>
    </Link>
  );
}
