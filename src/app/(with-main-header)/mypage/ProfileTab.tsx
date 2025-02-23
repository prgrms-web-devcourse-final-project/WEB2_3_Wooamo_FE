import PostsByUser from "../users/[id]/PostsByUser";
import StudyTimeJandy from "../users/[id]/StudyTimeJandy";
import MyProfile from "./MyProfile";
import { useIsMobile } from "@/hooks/useIsMobile";
import Image from "next/image";
import WhiteDividerShort from "@/assets/images/WhiteDividerShort.svg";

export default function ProfileTab() {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col lg:flex-row lg:justify-center items-center lg:items-start gap-12.5 lg:gap-20 px-5 lg:px-8">
      <MyProfile />
      {isMobile && (
        <div className="block lg:hidden">
          <Image src={WhiteDividerShort} alt="구분선 이미지" />
        </div>
      )}
      <section className="flex flex-col w-full lg:w-206 gap-7.5 lg:gap-13">
        <StudyTimeJandy />
        <PostsByUser />
      </section>
    </div>
  );
}
