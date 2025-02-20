import Avatar from "@/components/common/Avatar";
import basic from "@/assets/images/costumes/basic.png";
import Link from "next/link";

interface ChattingListItemProps {
  id: number;
  name: string;
  lastChatContent: string;
  read: boolean;
  chatTimestamp: string;
}

// 친구 채팅인지 팟 채팅인지 확인 후 라우팅 및 name 처리 해주시면 됩니다!
export default function ChattingListItem({
  id,
  name,
  lastChatContent,
  read,
  chatTimestamp,
}: ChattingListItemProps) {
  return (
    <Link href={`/chatting/party/${id}`}>
      <article
        className={`h-25 px-8 flex justify-between items-center ${
          read ? "bg-site-white-50" : ""
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div>
            <Avatar className="w-15 h-15" costumeSrc={basic} />
          </div>
          <div className="flex flex-col gap-1">
            <div>
              <span className="font-semibold text-xl">{name}</span>
            </div>
            <div className="flex gap-3">
              <span className="text-site-darkgray-02">{lastChatContent}</span>
              <span className="text-site-darkgray-01">{chatTimestamp}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
