import ProfileSummary from "@/components/common/ProfileSummary";

export default function ChattingCreate() {
  return (
    <div className="flex flex-col gap-13 px-5 lg:px-0">
      <div className="flex justify-between">
        <p className="font-galmuri text-xl lg:text-[28px]">친구 선택</p>
      </div>
      <div className="flex flex-col gap-6">
        {new Array(5).fill(0).map((_, idx) => (
          <ProfileSummary
            key={idx}
            nickname={`@user${idx}`}
            description="사용자의 자기소개가 출력됩니다"
          />
        ))}
      </div>
    </div>
  );
}
