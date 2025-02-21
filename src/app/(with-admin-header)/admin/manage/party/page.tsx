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
            key={`party${idx}`}
            index={idx}
            title={`팟 ${idx}`}
            description={`팟 ${idx}의 설명 글이 출력됩니다`}
            totalHeadcount={100}
            headcount={`99`}
            startDate="2025-00-00"
            endDate="2025-00-00"
            status="완료"
            certificationPhoto="사용자가 업로드 한 인증사진"
          />
        ))}
      </div>
    </div>
  );
}
