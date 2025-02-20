import ChattingItem from "../../ChattingItem";
import ChattingInput from "../../ChattingInput";

interface ChattingWithPartyProps {
  params: Promise<{ id: string }>;
}

export default async function ChattingWithParty({
  params,
}: ChattingWithPartyProps) {
  const { id } = await params;

  return (
    <div className="relative">
      <div className="fixed flex items-center h-20 lg:h-25 w-full top-15 lg:top-25 left-0 bg-site-button px-8 text-base lg:text-xl font-semibold">
        {`party ${id}`} | {`60명`}
      </div>
      <div className="px-5 lg:px-0 pt-12 pb-5">
        <div>
          {new Array(8).fill(0).map((_, idx) => (
            <ChattingItem
              key={idx}
              chatTime="15:30"
              nickname="@binnie"
              isMe={idx % 2 === 0 ? true : false}
              chatting="모두가 여기 있다 엄청 긴 채팅을 치게 되면 얼마나 늘어날지 정말 궁금하지 않나요? 그리고 그렇게 늘어났을 때는 채팅을 어떻게 처리해야될지도 궁금하잖아요 그렇죠? 이렇게나 길게 작성했는데 아직 엄청 길지는 않네요 이럴 때 말을 지어내는 것도 참 힘들어요 제발 공감해주세요"
            />
          ))}
        </div>
      </div>
      <div>
        <ChattingInput />
      </div>
    </div>
  );
}
