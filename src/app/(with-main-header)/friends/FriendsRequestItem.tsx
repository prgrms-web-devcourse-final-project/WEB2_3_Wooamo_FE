import Button from "@/components/common/Button";
import ProfileSummary from "@/components/common/ProfileSummary";

export default function FriendsRequestItem() {
  return (
    <article className="h-19 lg:h-25 flex justify-between items-center">
      <ProfileSummary nickname="프로필 닉네임" description="프로필 설명" />
      <div className="flex gap-2.5 lg:gap-5">
        <Button className="bg-site-main text-white">수락</Button>
        <Button>거절</Button>
      </div>
    </article>
  );
}
