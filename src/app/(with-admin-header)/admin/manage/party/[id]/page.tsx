import ParticipantItem from "./ParticipantItem";
import Button from "@/components/common/Button";
import { useState } from "react";
import CertificationDate from "./CertificationDate";

export default async function CertificationParty({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col gap-5">
      <div className="text-2xl font-semibold px-4">팟 {id}</div>
      <div className="w-full px-5 py-5 bg-site-white-70 rounded-xl border border-site-lightgray">
        팟 {id}의 설명을 출력합니다 <br />
        예시 : 인프런 한 입 크기로 잘라먹는 Next.js 매일 강의 하나씩 듣고 인증할
        팟 구합니다!
      </div>
      <div className="flex flex-col gap-5">
        <div className="font-semibold text-xl">날짜 선택</div>
        <CertificationDate />
      </div>
      <div className="flex gap-30">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div className="font-semibold text-xl">팟 인증</div>
            <div className="flex gap-2">
              <Button className="lg:text-sm lg:px-3 lg:h-10 bg-site-alarm text-site-white-100 font-pretendard">
                실패
              </Button>
              <Button className="lg:text-sm lg:px-3 lg:h-10 bg-site-main text-site-white-100 font-pretendard">
                성공
              </Button>
            </div>
          </div>
          <div className="w-100 h-100 bg-site-lightgray rounded-xl flex items-center justify-center">
            사용자가 인증한 사진은 fetch로 넣으면 됨
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="font-semibold text-xl">팟 인원</div>
          <div className="flex flex-wrap gap-8">
            {new Array(11).fill(0).map((_, idx) => (
              <ParticipantItem key={idx} />
            ))}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
