import Button from "@/components/common/Button";

export default function ClosedPartyRewardButton({
  questStatus,
}: {
  questStatus: string;
}) {
  return (
    <Button
      className={`${
        questStatus === "보상받기"
          ? "bg-site-main text-site-white"
          : questStatus === "보상완료"
          ? "bg-site-profile text-site-black-100"
          : "bg-site-darkgray-01 text-white"
      }`}
    >
      {questStatus}
    </Button>
  );
}
