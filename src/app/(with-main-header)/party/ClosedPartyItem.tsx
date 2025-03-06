import ClosedPartyRewardButton from "./ClosedPartyRewardButton";

interface ClosedPartyItemProps {
  partyId: number;
  name: string;
  rewardPoint: number;
  questStatus: string;
}

export default function ClosedPartyItem({
  partyId,
  name,
  rewardPoint,
  questStatus,
}: ClosedPartyItemProps) {
  return (
    <article
      key={partyId}
      className="flex justify-between items-center h-14 lg:h-25 bg-site-button px-5"
    >
      <div className="flex gap-2.5 items-end">
        <p className="font-semibold text-xl">{name}</p>
        <p className="font-semibold">{rewardPoint}p</p>
      </div>
      <ClosedPartyRewardButton partyId={partyId} questStatus={questStatus} />
    </article>
  );
}
