"use client";

import { partyApi } from "@/api/party/party";
import { revalidateTagAction } from "@/actions";
import Button from "@/components/common/Button";
import { useToastStore } from "@/store/toastStore";

export default function ClosedPartyRewardButton({
  questStatus,
  partyId,
}: {
  questStatus: string;
  partyId: number;
}) {
  const showToast = useToastStore((state) => state.showToast);

  const getPartyQuestReward = async () => {
    const partyQuestReward = await partyApi.postPartyQuestReward(partyId);

    if (partyQuestReward?.status === "성공") {
      revalidateTagAction("party-quest");
      revalidateTagAction("point");
      showToast(
        `팟 미션 클리어! ${partyQuestReward.data.point}포인트를 획득했습니다.`,
      );
    }
  };

  return (
    <>
      {questStatus === "보상받기" && (
        <Button
          onClick={getPartyQuestReward}
          className="bg-site-main text-site-white-100"
        >
          {questStatus}
        </Button>
      )}
      {questStatus !== "보상받기" && (
        <Button
          className={`${
            questStatus === "보상완료"
              ? "bg-site-profile text-black"
              : "bg-site-darkgray-01 text-site-white-100"
          }`}
        >
          {questStatus}
        </Button>
      )}
    </>
  );
}
