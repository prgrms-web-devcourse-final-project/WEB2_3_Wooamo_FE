import Avatar from "@/components/common/Avatar";
import Link from "next/link";

interface ChattingListItemProps {
  roomId: string;
  roomType: string;
  roomName: string;
  lastSenderId: number;
  lastMessage: string;
  profile: string;
  unreadCount: number;
  userInfo?: userType;
}

// 친구 채팅인지 팟 채팅인지 확인 후 라우팅 및 name 처리 해주시면 됩니다!
export default function ChattingListItem({
  roomId,
  roomType,
  roomName,
  lastSenderId,
  lastMessage,
  profile,
  unreadCount,
  userInfo,
}: ChattingListItemProps) {
  return (
    <Link
      href={
        roomType === "PRIVATE"
          ? `/chatting/friend/${userInfo?.userId}?roomId=${roomId}`
          : `chatting/party/${userInfo?.userId}?roomId=${roomId}`
      }
    >
      <article
        className={`h-20 lg:h-25 px-5 lg:px-8 flex justify-between items-center ${
          unreadCount !== 0 ? "bg-site-white-50" : ""
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div>
            <Avatar
              className="w-11 lg:w-15 h-11 lg:h-15"
              costumeSrc={profile}
            />
          </div>
          <div className="flex flex-col gap-0 lg:gap-1">
            <div>
              <span className="font-semibold text-xl">{lastSenderId}</span>
            </div>
            <div className="flex gap-3 text-sm lg:text-base">
              <span className="text-site-darkgray-02">{lastMessage}</span>
              <span className="text-site-darkgray-01">{}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
