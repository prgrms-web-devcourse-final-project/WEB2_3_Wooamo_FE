import { adminApi } from "@/api/admin/admin";
import Button from "@/components/common/Button";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CertificationViewer() {
  const searchParams = useSearchParams();
  const [certificationImage, setCertificationImage] = useState("");
  const date = searchParams.get("date");
  const memberId = searchParams.get("memberId");

  const { id } = useParams();

  useEffect(() => {
    const fetchMemberCertification = async () => {
      if (!id || !memberId || !date) return;
      const memberCertification = await adminApi.getMemberCertification(
        Number(id),
        Number(memberId),
        date,
      );

      if (!memberCertification) return;
      setCertificationImage(memberCertification?.data.image);
    };

    fetchMemberCertification();
  }, [memberId]);

  const handleConfirmCertification = async (auth: boolean) => {
    if (!date) return;
    await adminApi.patchConfirmCertification(Number(id), Number(memberId), {
      date,
      auth,
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-xl">팟 인증</div>
        <div className="flex gap-2">
          <Button
            className="lg:text-sm lg:px-3 lg:h-10 bg-site-alarm text-site-white-100 font-pretendard"
            onClick={() => handleConfirmCertification(false)}
          >
            실패
          </Button>
          <Button
            className="lg:text-sm lg:px-3 lg:h-10 bg-site-main text-site-white-100 font-pretendard"
            onClick={() => handleConfirmCertification(true)}
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
