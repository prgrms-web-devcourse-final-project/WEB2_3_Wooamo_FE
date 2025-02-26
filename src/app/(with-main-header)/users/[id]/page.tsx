import StudyTimeJandy from "./StudyTimeJandy";
import PostsByUser from "./PostsByUser";
import UserProfile from "./UserProfile";
import Image from "next/image";
import WhiteDividerShort from "@/assets/images/WhiteDividerShort.svg";

interface UserDetailProps {
  searchParams: Promise<{
    year: number;
    month: number;
  }>;
}

export default async function UserDetail({ searchParams }: UserDetailProps) {
  const { year: selectedYear, month: selectedMonth } = await searchParams;
  const currentDate = new Date();

  const year = selectedYear ?? currentDate.getFullYear();
  const month = selectedMonth ?? currentDate.getMonth() + 1;

  return (
    <div className="flex flex-col lg:flex-row lg:justify-center items-center lg:items-start gap-12.5 lg:gap-20 px-5 lg:px-8">
      <UserProfile />
      <Image
        src={WhiteDividerShort}
        alt="구분선 이미지"
        className="block lg:hidden"
      />
      <section className="flex flex-col w-full lg:w-206 gap-7.5 lg:gap-13">
        <StudyTimeJandy year={year} month={month} />
        <PostsByUser />
      </section>
    </div>
  );
}
