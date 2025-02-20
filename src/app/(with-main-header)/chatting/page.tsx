import ChattingHeader from "./ChattingHeader";
import ChattingListItem from "./ChattingListItem";

export default function Chatting() {
  return (
    <div className="flex flex-col gap-13">
      <ChattingHeader />
      <section className="flex flex-col">
        {new Array(5)
          .fill(0)
          .map((_, idx) =>
            idx % 2 === 0 ? (
              <ChattingListItem
                key={idx}
                id={idx}
                nickname={`@user ${idx}`}
                lastChatContent="혹시 자료 공유 해주실 수 있나요?"
                read={true}
                chatTimestamp="방금"
              />
            ) : (
              <ChattingListItem
                key={idx}
                id={idx}
                nickname={`@user ${idx}`}
                lastChatContent="반가워요!"
                read={false}
                chatTimestamp="3시간 전"
              />
            )
          )}
      </section>
    </div>
  );
}
