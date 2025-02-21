import PartyList from "../../PartyList";

export default function page() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex px-5 font-semibold text-xl">
        <div className="flex-2">팟</div>
        <div className="flex-1">인원</div>
        <div className="flex-1">시작일</div>
        <div className="flex-1">마감일</div>
        <div className="flex-1">인증 상태</div>
      </div>
      <div className="flex flex-col gap-5">
        {new Array(8).fill(0).map((_, idx) => (
          <PartyList
            key={idx}
            title="오하요 - 기상인증 🔥"
            headcount={`99/100`}
            startDate="2025-00-00"
            endDate="2025-00-00"
            status="완료"
          />
        ))}
      </div>
    </div>
  );
}
