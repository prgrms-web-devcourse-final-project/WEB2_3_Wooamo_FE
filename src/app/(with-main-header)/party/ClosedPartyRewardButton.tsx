"use client";

import { partyApi } from "@/api/party/party";
import { revalidateTagAction } from "@/app/actions";
import Button from "@/components/common/Button";

export default function ClosedPartyRewardButton({
  questStatus,
  partyId,
}: {
  questStatus: string;
  partyId: number;
}) {
  const getPartyQuestReward = async () => {
    const partyQuestReward = await partyApi.postPartyQuestReward(partyId);

    if (partyQuestReward?.status === "성공") {
      revalidateTagAction("party-quest");

      // 보상 획득 시 얼마 획득했다고 나오는 토스트 추가
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
