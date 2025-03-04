import { chattingApi } from "@/api/chatting/chatting";
import ChattingHeader from "./ChattingHeader";
import ChattingListItem from "./ChattingListItem";
import { userApi } from "@/api/user/user";

export default async function Chatting() {
  const fetchCurrentUser = await userApi.getCurrentUserInfo();
  const userId = fetchCurrentUser?.data.userId;
  if (!userId) return;

  const fetchChattingList = await chattingApi.getChattingList(userId);
  const chattingList = fetchChattingList?.data;

  console.log(fetchChattingList?.message);

  return (
    <div className="flex flex-col gap-13">
      <ChattingHeader />
      <section className="flex flex-col">
        {chattingList ? (
          chattingList.map((chatting) => (
            <ChattingListItem
              roomId={chatting.roomId}
              roomType={chatting.roomType}
              roomName={chatting.roomName}
              lastSenderId={chatting.lastSenderId}
              lastMessage={chatting.lastMessage}
              profile={chatting.profile}
              unreadCount={chatting.unreadCount}
            />
          ))
        ) : (
          <div className="text-site-darkgray-02">
            <p>채팅 목록이 없습니다</p>
            <p>다른 유저와 채팅을 시작해보세요!</p>
          </div>
        )}
      </section>
    </div>
  );
}
