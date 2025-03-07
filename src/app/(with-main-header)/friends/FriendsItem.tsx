import ProfileSummary from "@/components/common/ProfileSummary";

export default async function FriendsItem({ friend }: { friend: friendType }) {
  return (
    <article className="h-19 lg:h-25 flex justify-between items-center">
      <ProfileSummary
        userId={friend.userId}
        costume={friend.profile}
        nickname={friend.nickname}
        description={friend.context}
      />
    </article>
  );
}
