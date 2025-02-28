"use client";

import { partyApi } from "@/api/party/party";
import { revalidatePathAction } from "@/actions";

export default function PersonalQuest({
  personalQuestState,
}: {
  personalQuestState: string;
}) {
  const getPersonalQuestReward = async () => {
    const personalQuestReward = await partyApi.postPersonalQuestReward();

    if (personalQuestReward?.status === "성공") {
      revalidatePathAction("personal-quest-state");

      // 보상 획득 시 얼마 획득했다고 나오는 토스트 추가
    }
  };
  return (
    <div className="fixed top-15 lg:top-25 left-0 w-screen h-15 bg-site-button flex justify-between items-center px-12 z-10">
      <p className="font-semibold">[일일미션] 공부 시간 3시간 이상</p>
      {personalQuestState === "보상받기" ? (
        <button onClick={getPersonalQuestReward} className="font-semibold">
          {personalQuestState}
        </button>
      ) : (
        <p className="font-semibold">{personalQuestState}</p>
      )}
    </div>
  );
}
