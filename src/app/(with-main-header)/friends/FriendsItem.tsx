import Button from "@/components/common/Button";
import ProfileSummary from "@/components/common/ProfileSummary";

export default function FriendsItem() {
  const isMyFriend = true;

  return (
    <article className="h-19 lg:h-25 flex justify-between items-center">
      <ProfileSummary nickname="프로필 닉네임" description="프로필 설명" />
      {isMyFriend ? <Button>삭제</Button> : <Button>친구신청</Button>}
    </article>
  );
}
