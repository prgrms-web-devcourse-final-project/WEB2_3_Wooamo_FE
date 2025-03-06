"use client";

import { revalidateTagAction } from "@/actions";
import { adminApi } from "@/api/admin/admin";
import Button from "@/components/common/Button";
import formatDateToKR from "@/utils/formatDateToKR";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CertificationViewerProps {
  selectedDate: Date;
  selectedMember: PartyMemberType;
}

export default function CertificationViewer({
  selectedDate,
  selectedMember,
}: CertificationViewerProps) {
  const { id } = useParams();
  const [certificationImage, setCertificationImage] = useState("");
  const stringDate = formatDateToKR(selectedDate);
  const memberId = selectedMember.memberId;

  useEffect(() => {
    const fetchMemberCertification = async () => {
      if (!id || !memberId || !stringDate) return;

      const memberCertification = await adminApi.getMemberCertification(
        Number(id),
        memberId,
        stringDate,
      );

      if (memberCertification)
        setCertificationImage(memberCertification?.data.image);
      else setCertificationImage("");
    };

    fetchMemberCertification();
  }, [memberId, stringDate]);

  console.log(certificationImage);

  const handleConfirmCertification = async (auth: boolean) => {
    if (!stringDate) return;

    console.log(stringDate, auth);
    const confirmCertification = await adminApi.patchConfirmCertification(
      Number(id),
      memberId,
      {
        date: stringDate,
        auth,
      },
    );

    if (confirmCertification?.status === "성공") {
      revalidateTagAction("member-list");
      revalidateTagAction("certification-status");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-xl">팟 인증</div>
        <div className="flex gap-2">
          <Button
            disabled={
              selectedMember.isAuth !== "NOT_AUTH" &&
              selectedMember.isAuth !== "PENDING"
            }
            className={`lg:text-sm lg:px-3 lg:h-10 bg-site-alarm text-site-white-100 font-pretendard`}
            onClick={() => {
              handleConfirmCertification(false);
              console.log(`인증 실패`);
            }}
          >
            실패
          </Button>
          <Button
            disabled={
              selectedMember.isAuth !== "NOT_AUTH" &&
              selectedMember.isAuth !== "PENDING"
            }
            className={`lg:text-sm lg:px-3 lg:h-10 bg-site-main text-site-white-100 font-pretendard`}
            onClick={() => {
              handleConfirmCertification(true);
              console.log(`인증 성공`);
            }}
          >
            성공
          </Button>
        </div>
      </div>
      <div className="w-100 h-100 bg-site-lightgray rounded-xl flex items-center justify-center">
        {certificationImage ? (
          <Image
            src={certificationImage}
            width={400}
            height={400}
            alt="사용자가 인증한 사진"
          />
        ) : (
          <div>아직 인증을 하지 않았습니다</div>
        )}
      </div>
    </div>
  );
}
