import Avatar from "@/components/common/Avatar";
import basic from "@/assets/images/costumes/basic.png";
import Link from "next/link";

interface ChatItemProps {
  id: number;
  nickname: string;
  lastChatContent: string;
  read: boolean;
  chatTimestamp: string;
}

export default function ChattingListItem({
  id,
  nickname,
  lastChatContent,
  read,
  chatTimestamp,
}: ChatItemProps) {
  return (
    <Link href={`/chatting/friend/${id}`}>
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
              <span className="font-semibold text-xl">{nickname}</span>
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
