interface PartyListProps {
  title: string;
  headcount: string;
  startDate: string;
  endDate: string;
  status: string;
}

export default function PartyList({
  title,
  headcount,
  startDate,
  endDate,
  status,
}: PartyListProps) {
  return (
    <div className="flex px-5 py-10 bg-site-white-70">
      <div className="flex-2">{title}</div>
      <div className="flex-1">{headcount}</div>
      <div className="flex-1">{startDate}</div>
      <div className="flex-1">{endDate}</div>
      <div className="flex-1">{status}</div>
    </div>
  );
}
