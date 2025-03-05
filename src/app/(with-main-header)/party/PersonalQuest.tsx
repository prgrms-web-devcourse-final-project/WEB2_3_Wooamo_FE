"use client";

import { partyApi } from "@/api/party/party";
import { revalidateTagAction } from "@/actions";
import { useToastStore } from "@/store/toastStore";

export default function PersonalQuest({
  personalQuestState,
}: {
  personalQuestState: string;
}) {
  const showToast = useToastStore((state) => state.showToast);

  const getPersonalQuestReward = async () => {
    const personalQuestReward = await partyApi.postPersonalQuestReward();

    if (personalQuestReward?.status === "성공") {
      revalidateTagAction("personal-quest-state");
      revalidateTagAction("point");
      showToast("일일 미션 클리어! 3포인트를 획득했습니다.");
    } else {
      showToast("일일 미션 보상 수령에 실패했습니다.");
    }
  };
  return (
    <div className="fixed top-15 lg:top-25 left-0 w-screen h-15 bg-site-button flex justify-between items-center px-12 z-10">
      <p className="font-semibold">[일일미션] 공부 시간 3시간 이상</p>
      {personalQuestState === "보상 받기" ? (
        <button
          onClick={getPersonalQuestReward}
          className="font-semibold cursor-pointer"
        >
          {personalQuestState}
        </button>
      ) : (
        <p className="font-semibold">{personalQuestState}</p>
      )}
    </div>
  );
}
